import { asyncHandler } from "../utils/asyncHandler.js";
import * as BookService from "../services/Booking.service.js";

export const CreateBooking = asyncHandler(async (req, res, next) => {
  const newBook = await BookService.CreateBooking(req.body);
  return res.status(201).json({
    message: "Booking Created Successfully",
    deta: newBook,
  });
});



