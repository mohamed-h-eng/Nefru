import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verificationUploadDir = path.resolve(
  __dirname,
  "..",
  "..",
  "private-uploads",
  "guide-verification",
);

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
]);

function fileFilter(req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    const error = new Error("Only JPEG, PNG, and PDF documents are allowed");
    error.statusCode = 400;
    callback(error, false);
    return;
  }

  callback(null, true);
}

export const verificationUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

export function resolveVerificationFile(storageKey) {
  const safeName = path.basename(storageKey);
  return path.join(verificationUploadDir, safeName);
}

export async function isValidVerificationFile(file) {
  const buffer = file?.buffer;

  if (!Buffer.isBuffer(buffer)) return false;

  if (file.mimetype === "application/pdf") {
    return (
      buffer.length >= 5 &&
      buffer.subarray(0, 5).toString("ascii") === "%PDF-"
    );
  }

  if (file.mimetype === "image/png") {
    const pngSignature = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    return (
      buffer.length >= pngSignature.length &&
      buffer.subarray(0, pngSignature.length).equals(pngSignature)
    );
  }

  if (file.mimetype === "image/jpeg") {
    return (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }

  return false;
}
