import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getTicketsForEventService,
  createTicketService,
  updateTicketService,
  deleteTicketService,
} from '../services/ticket.service.js';

export const getTicketsForEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const tickets = await getTicketsForEventService(eventId);

  res.status(200).json({
    success: true,
    message: 'Tickets fetched successfully',
    data: tickets,
  });
});

export const createTicket = asyncHandler(async (req, res) => {
  const { eventId, name, price, quantity } = req.body;

  if (!eventId || !name || typeof price !== 'number' || typeof quantity !== 'number') {
    res.status(400);
    throw new Error('eventId, name, price, and quantity are required');
  }

  const ticket = await createTicketService({ eventId, name, price, quantity });

  res.status(201).json({
    success: true,
    message: 'Ticket created successfully',
    data: ticket,
  });
});

export const updateTicket = asyncHandler(async (req, res) => {
  const { eventId, name, price, quantity } = req.body;
  const payload = {};

  if (eventId !== undefined) payload.eventId = eventId;
  if (name !== undefined) payload.name = name;
  if (price !== undefined) payload.price = price;
  if (quantity !== undefined) payload.quantity = quantity;

  const ticket = await updateTicketService(req.params.id, payload);

  res.status(200).json({
    success: true,
    message: 'Ticket updated successfully',
    data: ticket,
  });
});

export const deleteTicket = asyncHandler(async (req, res) => {
  await deleteTicketService(req.params.id);

  res.status(204).send();
});
