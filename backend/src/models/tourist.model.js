import mongoose from "mongoose";
import { mediaAssetSchema } from "./schemas/mediaAsset.schema.js";

const touristProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // firstName:{
    //   type: String,
    //   trim: true,
    //   maxlength: 15,
    //   required:true,
    // },
    // lastName:{
    //   type: String,
    //   trim: true,
    //   maxlength: 15,
    //   required:true,
    // },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    avatarAsset: {
      type: mediaAssetSchema,
      default: null,
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    nationality: {
      type: String,
      trim: true,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    preferredLanguage: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "en",
    },
    savedTrips: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
      default: [],
    },
  },
  { timestamps: true },
);
const TouristProfile = mongoose.model("TouristProfile", touristProfileSchema);

export { TouristProfile };
