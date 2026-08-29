export const MAX_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const IMAGE_UPLOAD_ACCEPT = ALLOWED_IMAGE_UPLOAD_TYPES.join(",");

export function getImageUploadError(file, label = "Image") {
  if (!file) return `${label} is required.`;

  if (!ALLOWED_IMAGE_UPLOAD_TYPES.includes(file.type)) {
    return `${label} must be a JPG, PNG, or WebP image.`;
  }

  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return `${label} must be 5 MB or smaller.`;
  }

  return "";
}
