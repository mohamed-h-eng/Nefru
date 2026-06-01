import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";

export const eventRouter = Router();

eventRouter.post("/create-event", eventController.createEvent);
eventRouter.get("", eventController.getAllEvents);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.patch("/:id", eventController.updateEvent);
eventRouter.put("/:id", eventController.updateEvent);
eventRouter.delete("/:id", eventController.deleteEvent);
