import { Trip } from '../models/trip.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc Get all trips with search and filter capabilities
 * @route GET /api/trips
 * @access Public
 */
export const getAllTrips = asyncHandler(async (req, res) => {
  const { search, category, location } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  const trips = await Trip.find(query).populate('guide', 'name profileImage');

  res.status(200).json({
    success: true,
    count: trips.length,
    data: trips
  });
});

/**
 * @desc Create a new trip
 * @route POST /api/trips
 * @access Private (Guide/Admin)
 */
export const createTrip = asyncHandler(async (req, res) => {
  // Guide ID should normally come from req.user (from auth middleware)
  // For now, we expect it in the body if not authenticated for testing purposes
  const trip = await Trip.create(req.body);

  res.status(201).json({
    success: true,
    data: trip
  });
});
