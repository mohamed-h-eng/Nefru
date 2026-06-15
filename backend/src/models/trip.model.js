import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // e.g., "3 hours", "Full Day"
    image: { type: String, default: "" },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["History", "Adventure", "Culture", "Food"],
      required: true,
    },
  },
  { timestamps: true },
);

export const Trip = mongoose.model("Trip", tripSchema);
