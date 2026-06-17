# Project Roadmap & TODOs

This file tracks ongoing tasks and future improvements.

## Priority 1: Backend Stabilization
- [ ] Finalize JWT implementation and secure routes.
- [ ] Implement data validation using a library (e.g., Joi or Zod).
- [ ] Resolve architectural questions in `docs/questions-to-decide.md`.
- [ ] Add unit and integration tests for auth services and controllers.

## Priority 2: Frontend Integration
- [ ] Connect Auth forms (Login/Register) to the backend API.
- [ ] Implement global state management (Context API or Redux) for User session.
- [ ] Handle protected routes in `react-router-dom`.
- [ ] Integrate API response handling with unified Toast/Notification system.

## Priority 3: Features & Polish
- [ ] Implement "Trips" listing and filtering on the Home page.
- [ ] Build the "Booking" flow (Select trip -> Choose dates -> Confirm).
- [ ] Admin Dashboard: Data visualization and user management.
- [ ] Optimize images and assets for faster loading.

## Documentation & DX
- [ ] Add Swagger/OpenAPI documentation for the backend.
- [ ] Create a `CONTRIBUTING.md` for team onboarding.
- [ ] Set up GitHub Actions for Linting and Testing.
