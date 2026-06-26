import { Router } from "express";
import {
  getAllTrips,
  createTrip,
  getTripById,
} from "../controllers/trip.controller.js";

const tripRouter = Router();

tripRouter.route("/").get(getAllTrips).post(createTrip);

tripRouter.route("/:id").get(getTripById);

export default tripRouter;
