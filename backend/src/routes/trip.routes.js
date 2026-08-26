import { Router } from "express";
import mongoose from "mongoose";
import { Trip } from "../models/trip.model.js";
import {
  getAllTrips,
  createTrip,
  getTripById,
  getMyGuideTrips,
  updateMyTrip,
  changeTripStatus,
  updateTripMedia,
} from "../controllers/trip.controller.js";
import {
  protect,
  requireApprovedGuide,
} from "../middlewares/authMiddleware.js";
import { upload } from "../config/upload.js";
const tripRouter = Router();

// tripRouter.route("/").get(getAllTrips).post(createTrip);

tripRouter.get("/guide/me", protect, getMyGuideTrips);
tripRouter
  .route("/")
  .get(getAllTrips)
  .post(protect, requireApprovedGuide, createTrip);
tripRouter.route("/:id").get(getTripById).patch(protect, requireApprovedGuide, updateMyTrip);
tripRouter.patch("/:id/status", protect, requireApprovedGuide, changeTripStatus);
tripRouter.patch("/:id/media", protect, requireApprovedGuide, updateTripMedia);
tripRouter.post(
  "/:id/upload-media",
  protect, requireApprovedGuide,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 6 },
  ]),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid trip ID" });
      }

      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ success: false, message: "Trip not found" });
      }

      if (req.user.role !== "admin" && trip.guide?.toString() !== req.user._id?.toString()) {
        return res.status(403).json({ success: false, message: "You can only upload media for your own tours" });
      }

      const files = req.files || {};
      const coverImage = files.coverImage?.[0];
      const galleryImages = files.galleryImages || [];

      const uploadedFiles = {
        coverImage: coverImage ? `/uploads/${coverImage.filename}` : "",
        galleryImages: galleryImages.map((file) => `/uploads/${file.filename}`),
      };

      res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        data: uploadedFiles,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

export default tripRouter;

