import crypto from "crypto";
import path from "path";

import {
  assertCloudinaryConfigured,
  cloudinary,
} from "../config/cloudinary.js";

const DOCUMENT_EXTENSION_BY_MIME = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "application/pdf": ".pdf",
};

function normalizeFolder(folder) {
  return String(folder || "nefru/misc")
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9/_-]/g, "-");
}

function valueFrom(asset, ...keys) {
  for (const key of keys) {
    const value = asset?.[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function hasPublicImageSignature(file) {
  const buffer = file?.buffer;
  if (!buffer || buffer.length < 12) return false;

  if (file.mimetype === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (file.mimetype === "image/png") {
    return buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  }

  if (file.mimetype === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  if (file.mimetype === "image/avif") {
    const header = buffer.subarray(0, Math.min(buffer.length, 32)).toString("ascii");
    return header.slice(4, 8) === "ftyp" && /avif|avis/.test(header.slice(8));
  }

  return false;
}

export function assertValidPublicImage(file) {
  if (hasPublicImageSignature(file)) return;

  const error = new Error("The uploaded image content is invalid");
  error.statusCode = 400;
  error.code = "INVALID_IMAGE_CONTENT";
  throw error;
}

export function toStoredAsset(result, overrides = {}) {
  if (!result) return null;

  return {
    provider: "cloudinary",
    assetId: result.asset_id || "",
    publicId: result.public_id || "",
    url: result.secure_url || result.url || "",
    resourceType: result.resource_type || overrides.resourceType || "image",
    deliveryType: result.type || overrides.deliveryType || "upload",
    version: result.version === undefined ? null : result.version,
    format: result.format || overrides.format || "",
    bytes: Number(result.bytes) || 0,
    width: Number(result.width) || 0,
    height: Number(result.height) || 0,
  };
}

function uploadBuffer(file, options) {
  assertCloudinaryConfigured();

  if (!file?.buffer?.length) {
    const error = new Error("The uploaded file is empty");
    error.statusCode = 400;
    throw error;
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        error.statusCode = error.http_code || error.statusCode || 502;
        reject(error);
        return;
      }

      resolve(result);
    });

    stream.on("error", reject);
    stream.end(file.buffer);
  });
}

export async function uploadPublicImage(
  file,
  { folder, publicId, tags = [] } = {},
) {
  assertValidPublicImage(file);
  const result = await uploadBuffer(file, {
    resource_type: "image",
    type: "upload",
    folder: normalizeFolder(folder),
    public_id: publicId || crypto.randomUUID(),
    overwrite: false,
    unique_filename: false,
    use_filename: false,
    tags,
  });

  return toStoredAsset(result, {
    resourceType: "image",
    deliveryType: "upload",
  });
}

export async function uploadAuthenticatedDocument(file, { folder } = {}) {
  const extension =
    DOCUMENT_EXTENSION_BY_MIME[file?.mimetype] ||
    path.extname(String(file?.originalname || "")).toLowerCase();
  const result = await uploadBuffer(file, {
    resource_type: "raw",
    type: "authenticated",
    folder: normalizeFolder(folder),
    public_id: `${crypto.randomUUID()}${extension}`,
    overwrite: false,
    unique_filename: false,
    use_filename: false,
    headers: "X-Robots-Tag: noindex",
  });

  return toStoredAsset(result, {
    resourceType: "raw",
    deliveryType: "authenticated",
    format: extension.replace(/^\./, ""),
  });
}

export function isCloudinaryAsset(asset) {
  const provider = valueFrom(asset, "provider", "storageProvider");
  const publicId = valueFrom(asset, "publicId", "public_id");
  return provider === "cloudinary" && Boolean(publicId);
}

export async function destroyCloudinaryAsset(asset, { invalidate = true } = {}) {
  if (!isCloudinaryAsset(asset)) return { result: "skipped" };

  assertCloudinaryConfigured();
  const publicId = valueFrom(asset, "publicId", "public_id");
  const resourceType =
    valueFrom(asset, "resourceType", "resource_type") || "image";
  const deliveryType =
    valueFrom(asset, "deliveryType", "delivery_type", "type") || "upload";

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    type: deliveryType,
    invalidate,
  });
}

export async function destroyCloudinaryAssets(assets, options = {}) {
  const uniqueAssets = Array.from(
    new Map(
      (assets || [])
        .filter(isCloudinaryAsset)
        .map((asset) => [valueFrom(asset, "assetId", "asset_id", "publicId", "public_id"), asset]),
    ).values(),
  );

  return Promise.allSettled(
    uniqueAssets.map((asset) => destroyCloudinaryAsset(asset, options)),
  );
}

export function getPrivateDownloadUrl(
  asset,
  { expiresInSeconds = 60, attachment = true } = {},
) {
  if (!isCloudinaryAsset(asset)) {
    const error = new Error("The requested file is not stored in Cloudinary");
    error.statusCode = 404;
    throw error;
  }

  assertCloudinaryConfigured();
  const publicId = valueFrom(asset, "publicId", "public_id");
  const format = valueFrom(asset, "format") || "bin";
  const resourceType =
    valueFrom(asset, "resourceType", "resource_type") || "raw";
  const deliveryType =
    valueFrom(asset, "deliveryType", "delivery_type", "type") ||
    "authenticated";

  return cloudinary.utils.private_download_url(publicId, format, {
    resource_type: resourceType,
    type: deliveryType,
    expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds,
    attachment: Boolean(attachment),
  });
}
