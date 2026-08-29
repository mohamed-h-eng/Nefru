import multer from "multer";

const storage = multer.memoryStorage();

const allowedImageMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const fileFilter = (req, file, cb) => {
  if (allowedImageMimeTypes.has(file.mimetype)) {
    cb(null, true);
    return;
  }

  const error = new Error("Only JPEG, PNG, WebP, and AVIF images are allowed");
  error.statusCode = 400;
  error.code = "UNSUPPORTED_IMAGE_TYPE";
  cb(error, false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 7,
  },
});

export { allowedImageMimeTypes };
