import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

const bookingRouter = Router();

// Skeleton endpoints for Bookings
bookingRouter.get('/', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Bookings fetched (skeleton)', data: [] });
}));

bookingRouter.post('/', asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: 'Booking created (skeleton)' });
}));

export default bookingRouter;
