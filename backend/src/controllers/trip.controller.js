import { Trip } from "../models/trip.model.js";
import { Guide } from "../models/guide.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

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
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  const trips = await Trip.find(query).populate("guide", "name profileImage");

  res.status(200).json({
    success: true,
    count: trips.length,
    data: trips,
  });
});

/**
 * @desc Get a single trip by ID with full details including guide info
 * @route GET /api/trips/:id
 * @access Public
 */
export const getTripById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid trip ID");
  }

  const trip = await Trip.findById(req.params.id)
    .populate("guide", "fullName avatar verificationStatus")
    .lean();

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  // Fetch guide profile data for additional info
  const guideProfile = await Guide.findOne({ user: trip.guide._id })
    .select("rating reviewsCount about yearsExperience languages specialties")
    .lean();

  const tripResponse = {
    id: trip._id,
    title: trip.title,
    description: trip.description,
    longDescription: trip.longDescription || trip.description,
    location: trip.location,
    price: trip.price,
    duration: trip.duration,
    image: trip.image,
    category: trip.category,
    rating: trip.rating || guideProfile?.rating || 0,
    reviewsCount: trip.reviewsCount || 0,
    highlights: trip.highlights || [],
    reviews: trip.reviews || [],
    date: trip.createdAt
      ? new Date(trip.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "N/A",
    guide: {
      id: trip.guide._id,
      name: trip.guide.fullName,
      avatar: trip.guide.avatar,
      badge: `${guideProfile?.yearsExperience || 0}+ years experience`,
      rating: guideProfile?.rating || 0,
      reviewsCount: guideProfile?.reviewsCount || 0,
      about: guideProfile?.about || "No bio available",
      verified: trip.guide.verificationStatus === "approved",
    },
  };

  res.status(200).json({
    success: true,
    data: tripResponse,
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
    data: trip,
  });
});
