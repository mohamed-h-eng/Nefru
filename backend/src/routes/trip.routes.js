import { Router } from "express";
import {
  getAllTrips,
  createTrip,
  getTripById,
  getMyGuideTrips,
  updateMyTrip,
  changeTripStatus,
  authorizeTripMediaUpload,
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
tripRouter.patch("/:id/status", protect,requireApprovedGuide, changeTripStatus);
tripRouter.post(
  "/:id/upload-media",
  protect,
  requireApprovedGuide,
  authorizeTripMediaUpload,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 6 },
  ]),
  updateTripMedia,
);

export default tripRouter;
