import { Booking } from "../models/booking.model";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const CreateBooking = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const { tourId } = req.body;
  if (!tourId) {
    return next(new AppError("Tour Id Not Found", 404));
  }

  const trip = await tri

});
