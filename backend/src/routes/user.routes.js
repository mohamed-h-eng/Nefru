import { Router } from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/upload.js";
import { validate } from "../middlewares/validate.js";
import { updateTouristProfileSchema } from "../controllers/validation/userValidation.js";
import { getMe } from "../controllers/user.controller.js";
import {
  getMyProfile,
  removeMyAvatar,
  uploadMyAvatar,
  updateMyProfile,
} from "../controllers/profile.controller.js";
import {
  getSavedTrips,
  saveTrip,
  unsaveTrip,
} from "../controllers/savedTrip.controller.js";
import { createRateLimiter } from "../utils/rateLimiter.js";

const userRouter = Router();
const profileUploadLimiter = createRateLimiter({
  name: "profile-avatar-upload",
  windowMs: 60 * 60 * 1000,
  max: 20,
});

userRouter.get("/profile/me", protect, getMyProfile);
userRouter.patch(
  "/profile/me",
  protect,
  validate(updateTouristProfileSchema),
  updateMyProfile,
);
userRouter.post(
  "/profile/avatar",
  protect,
  authorizeRoles("tourist", "guide"),
  profileUploadLimiter,
  upload.single("avatar"),
  uploadMyAvatar,
);
userRouter.delete(
  "/profile/avatar",
  protect,
  authorizeRoles("tourist", "guide"),
  removeMyAvatar,
);

userRouter.get("/me", protect, getMe);
userRouter.get("/saved-trips", protect, authorizeRoles("tourist"), getSavedTrips);
userRouter.post("/saved-trips/:tripId", protect, authorizeRoles("tourist"), saveTrip);
userRouter.delete("/saved-trips/:tripId", protect, authorizeRoles("tourist"), unsaveTrip);

export default userRouter;
