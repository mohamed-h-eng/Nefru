import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect } from "../middlewares/authMiddleware.js";
import { getMe } from "../controllers/user.controller.js";

const userRouter = Router();

// Skeleton endpoints for Users
userRouter.get('/profile', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'User profile fetched (skeleton)' });
}));

userRouter.get('/me', protect, getMe);
export default userRouter;
