import mongoose from 'mongoose';
import { Event } from '../models/event.model.js';


export async function createEventService(payload) {
  return event = await Event.create(payload);

}


export async function getAllEventsService() {
  return Event.find().sort({ createdAt: -1 });
}

export async function getEventByIdService(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid event id');
    error.statusCode = 400;
    error.code = 'BAD_REQUEST';
    throw error;
  }

  const event = await Event.findById(id);
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  return event;
}



export async function updateEventService(id, payload) {
  const event = await getEventByIdService(id);
  Object.assign(event, payload);
  await event.save();
  return event;
}

export async function deleteEventService(id) {
  const event = await getEventByIdService(id);
  await event.deleteOne();
  return true;
}
