import { Booking } from "../models/booking.model.js";
import { Guide } from "../models/guide.model.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const CreateBooking = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const { tourId } = req.body;
  if (!tourId) {
    return next(new AppError("Tour Id Not Found", 404));
  }

  const trip = await Guide.find(tourId);
  console.log(trip);
});

export const getAllBooking = asyncHandler(async (req, res, next) => {
  
});
