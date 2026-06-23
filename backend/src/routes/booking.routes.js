import { Router } from "express";
import * as BookController from "../controllers/Book.controller.js";
const bookingRouter = Router();

// Skeleton endpoints for Bookings
bookingRouter.get("/", BookController.CreateBooking);

// bookingRouter.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     res
//       .status(201)
//       .json({ success: true, message: "Booking created (skeleton)" });
//   }),
// );

export default bookingRouter;
