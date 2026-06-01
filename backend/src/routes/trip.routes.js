import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

const tripRouter = Router();

// Skeleton endpoints for Trips
tripRouter.get('/', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Trips fetched (skeleton)', data: [] });
}));

tripRouter.post('/', asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, message: 'Trip created (skeleton)' });
}));

export default tripRouter;
