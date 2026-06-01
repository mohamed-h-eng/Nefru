import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRouter = Router();

// Skeleton endpoints for Users
userRouter.get('/profile', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'User profile fetched (skeleton)' });
}));

export default userRouter;
