import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
  deleteEventService,
} from "../services/event.service.js";

export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, image } = req.body;

  if (!title || !description || !date || !location) {
    res.status(400);
    throw new Error("title, description, date, and location are required");
  }

  const event = await createEventService({
    title,
    description,
    date,
    location,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await getAllEventsService();

  res.status(200).json({
    success: true,
    message: "Events fetched successfully",
    data: events,
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await getEventByIdService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Event fetched successfully",
    data: event,
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, image } = req.body;
  const payload = {};

  if (title !== undefined) payload.title = title;
  if (description !== undefined) payload.description = description;
  if (date !== undefined) payload.date = date;
  if (location !== undefined) payload.location = location;
  if (image !== undefined) payload.image = image;

  const event = await updateEventService(req.params.id, payload);

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  await deleteEventService(req.params.id);

  res.status(204).send();
});
