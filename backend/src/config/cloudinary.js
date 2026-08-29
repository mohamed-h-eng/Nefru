import { v2 as cloudinary } from "cloudinary";

import { env } from "./env.js";

function credentialsFromUrl(value) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "cloudinary:") return null;

    return {
      cloud_name: decodeURIComponent(parsed.hostname),
      api_key: decodeURIComponent(parsed.username),
      api_secret: decodeURIComponent(parsed.password),
    };
  } catch {
    return null;
  }
}

const urlCredentials = credentialsFromUrl(env.cloudinaryUrl);
const explicitCredentials = {
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
};
const credentials = urlCredentials || explicitCredentials;

export const isCloudinaryConfigured = Boolean(
  credentials.cloud_name && credentials.api_key && credentials.api_secret,
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    ...credentials,
    secure: true,
    signature_algorithm: "sha256",
  });
} else if (env.nodeEnv === "production") {
  throw new Error(
    "Cloudinary must be configured in production with CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET",
  );
}

export function assertCloudinaryConfigured() {
  if (isCloudinaryConfigured) return;

  const error = new Error("Cloudinary media storage is not configured");
  error.statusCode = 503;
  error.code = "CLOUDINARY_NOT_CONFIGURED";
  throw error;
}

export { cloudinary };
export default cloudinary;
