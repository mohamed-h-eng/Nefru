# Simple Event CMS

A simple full-stack learning project for managing events and displaying ticket information.

This project is intentionally minimal and focused on practicing core full-stack concepts such as:
- REST API design
- CRUD operations
- frontend-backend integration
- role-based access basics

## Project Concept

This is a simple Event CMS with two roles:

### Admin
- Create, edit, and delete events
- Manage tickets for events

### User
- View events
- View ticket information
- No booking or purchasing

## Goal

Keep the system minimal and learning-focused.

The project is designed to help practice:
- backend API structure
- frontend React structure
- database modeling
- route/controller/service separation
- clean development conventions

## MVP Features

## 1. Authentication
- Admin login
- Optional user login or public access for viewing events

## 2. Event Management
Admin can:
- Create events
- Edit events
- Delete events

Each event includes:
- Title
- Description
- Date
- Location
- Image (optional)

Users can:
- View all events
- View event details

## 3. Tickets (Display Only)
Each event can have ticket types such as:
- Standard
- VIP

Each ticket includes:
- Name
- Price
- Quantity

Users can:
- View available tickets
- No booking functionality is included

## Scope Limitations
To keep the project simple:
- No payment system
- No ticket booking
- No notifications
- No real-time features

This project is strictly an MVP for learning.

## Planned API Structure

### Authentication
- `POST /login` -> Admin login

### Events
- `GET /events` -> Get all events
- `GET /events/:id` -> Get single event
- `POST /events` -> Create event (Admin only)
- `PUT /events/:id` -> Update event (Admin only)
- `DELETE /events/:id` -> Delete event (Admin only)

### Tickets
- `GET /events/:id/tickets` -> Get tickets for an event
- `POST /tickets` -> Create ticket (Admin only)
- `PUT /tickets/:id` -> Update ticket (Admin only)
- `DELETE /tickets/:id` -> Delete ticket (Admin only)

## Planned Frontend Pages

### User Pages
#### Home Page
- Displays list of all events

#### Event Details Page
- Shows event information
- Displays available ticket types

### Admin Pages
#### Dashboard
- Overview of system

#### Manage Events
- Create, edit, and delete events

#### Manage Tickets
- Add, edit, and delete tickets per event

## Project Structure

```text
backend/   -> Express API server
frontend/  -> React frontend
docs/      -> development rules, API conventions, and checklists
```

## Development Notes
- Focus on a clean UI and simple UX
- Keep components reusable
- Connect frontend to API using fetch or axios
- Handle loading and error states clearly
- Keep backend logic separated into routes, controllers, services, and models when needed

## Learning Outcomes
By building this project, you can practice:
- REST API design
- CRUD operations
- backend structure and layering
- frontend state and routing
- frontend-backend integration
- basic role-based access

## Current Status
This repository currently contains a starter full-stack structure with:
- backend folder scaffold
- frontend React scaffold
- docs for development conventions

Feature implementation for events, tickets, and auth can now be added on top of this structure.
