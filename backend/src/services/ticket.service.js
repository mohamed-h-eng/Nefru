import mongoose from 'mongoose';
import { Ticket } from '../models/ticket.model.js';
import { getEventByIdService } from './event.service.js';

export async function getTicketsForEventService(eventId) {
  await getEventByIdService(eventId);
  return Ticket.find({ eventId }).sort({ createdAt: -1 });
}

export async function createTicketService(payload) {
  await getEventByIdService(payload.eventId);
  return Ticket.create(payload);
}

export async function updateTicketService(id, payload) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ticket id');
    error.statusCode = 400;
    error.code = 'BAD_REQUEST';
    throw error;
  }

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  if (payload.eventId) {
    await getEventByIdService(payload.eventId);
  }

  Object.assign(ticket, payload);
  await ticket.save();
  return ticket;
}

export async function deleteTicketService(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ticket id');
    error.statusCode = 400;
    error.code = 'BAD_REQUEST';
    throw error;
  }

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    const error = new Error('Ticket not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }

  await ticket.deleteOne();
  return true;
}
