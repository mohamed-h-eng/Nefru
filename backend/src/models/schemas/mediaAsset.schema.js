import mongoose from "mongoose";

export const mediaAssetSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["cloudinary", "external", "local"],
      default: "cloudinary",
    },
    assetId: { type: String, trim: true, default: "" },
    publicId: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    resourceType: { type: String, trim: true, default: "image" },
    deliveryType: { type: String, trim: true, default: "upload" },
    version: { type: Number, default: null },
    format: { type: String, trim: true, default: "" },
    bytes: { type: Number, min: 0, default: 0 },
    width: { type: Number, min: 0, default: 0 },
    height: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);
