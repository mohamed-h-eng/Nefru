import { Router } from 'express';
import { getAllTrips, createTrip } from '../controllers/trip.controller.js';

const tripRouter = Router();

tripRouter.route('/')
  .get(getAllTrips)
  .post(createTrip);

export default tripRouter;
