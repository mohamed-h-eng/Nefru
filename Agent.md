# NEFRU - Agent Documentation

## Agent System Prompt

You are a senior pair-programming agent working inside an existing codebase. 
You have tool access to read files, run shell commands, and edit code.

## On every new session, before writing or changing anything:
1. Run a repo scan: list top-level structure, read README/package.json/pyproject.toml/
   Cargo.toml (whichever exists), and skim 2-3 entry-point files.
2. Identify: language(s), framework(s), package manager, test runner, lint/format 
   config, and build/run commands.
3. State a one-paragraph summary of what you found before doing anything else. 
   If anything is ambiguous (e.g. multiple possible entry points, unclear test 
   command), ask one clarifying question instead of guessing.

## Working rules
- Match existing code style exactly (naming, indentation, import order, error 
  handling patterns) — infer it from surrounding code, don't impose your own.
- Prefer the smallest correct diff. Don't refactor unrelated code unless asked.
- Never invent file paths, APIs, or config values — verify by reading the file 
  or running a command first.
- After any change: run the project's existing test/lint commands if available. 
  Report pass/fail. Don't claim something works without running it.
- If a task is underspecified, ask before implementing rather than assuming.

## Output contract
- Show a short plan (bullet list) before multi-file changes.
- For edits, show only the diff/changed regions, not full file dumps, unless asked.
- End each turn with: what changed, what you verified, what's untested/risky.

## Project Overview

**NEFRU** is a full-stack web application that connects tourists with professional tour guides in Egypt. The platform enables tourists to discover unique trips, view detailed itineraries, and book guides for personalized experiences.

### Core Value Proposition
- **Discovery:** Browse trips by category, location, or guide
- **Booking:** Securely book tour guides for specific dates and trips
- **Profiles:** Dedicated dashboards for Tourists (bookings/history) and Guides (listings/ratings)
- **Details:** Comprehensive trip information including itineraries, pricing, and guide expertise

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express | 4.22.2 | Web framework |
| MongoDB | - | Database |
| Mongoose | 8.24.0 | ODM for MongoDB |
| JWT | 9.0.3 | Authentication (planned) |
| bcrypt | 6.0.0 | Password hashing |
| Joi | 18.2.1 | Validation |
| CORS | 2.8.6 | Cross-origin resource sharing |
| Morgan | 1.11.0 | HTTP request logger |
| dotenv | 16.6.1 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.5 | UI library |
| Vite | 8.0.10 | Build tool & dev server |
| React Router | 7.15.0 | Client-side routing |
| Redux Toolkit | 2.12.0 | State management |
| Bootstrap | 5.3.8 | CSS framework |
| React Bootstrap | 2.10.10 | Bootstrap components |
| Chart.js | 4.5.1 | Data visualization |
| React Chartjs-2 | 5.3.1 | Chart.js React wrapper |
| React Datepicker | 9.1.0 | Date selection |
| React Icons | 5.6.0 | Icon library |
| Fontsource Inter | 5.2.8 | Typography |

---

## Project Structure

```
NEFRU_ai/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── server.js              # Server entry point
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── env.js             # Environment variables
│   │   ├── controllers/
│   │   │   ├── trip.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── Auth/
│   │   │   └── validation/
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── trip.model.js
│   │   │   ├── booking.model.js
│   │   │   └── admin.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── authUser.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── trip.routes.js
│   │   │   ├── booking.routes.js
│   │   │   └── admin.routes.js
│   │   ├── services/
│   │   │   └── auth.service.js
│   │   └── utils/
│   │       ├── AppError.js
│   │       ├── asyncHandler.js
│   │       └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── index.css              # Global styles
│   │   ├── assets/
│   │   │   ├── icons.jsx
│   │   │   ├── profile.png
│   │   │   └── images/
│   │   ├── components/
│   │   │   └── Tourist/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── Admin.jsx
│   │   │   │   └── components/
│   │   │   │       ├── DashboardStatus/
│   │   │   │       ├── Accounts/
│   │   │   │       ├── CMS/
│   │   │   │       ├── Analytics/
│   │   │   │       └── Booking/
│   │   │   ├── Auth/
│   │   │   │   ├── Welcome/
│   │   │   │   └── components/
│   │   │   │       ├── Login/
│   │   │   │       ├── Register/
│   │   │   │       ├── Forgetpassword/
│   │   │   │       ├── ResetPassword/
│   │   │   │       └── ApplicationReceived/
│   │   │   └── User/
│   │   │       ├── User.jsx
│   │   │       ├── Home/
│   │   │       ├── Discover/
│   │   │       ├── Trips/
│   │   │       │   ├── Info/
│   │   │       │   ├── Book/
│   │   │       │   │   └── components/Status/
│   │   │       │   └── Guide/
│   │   │       ├── Saved/
│   │   │       ├── Profile/
│   │   │       ├── Settings/
│   │   │       └── Navbar/
│   │   ├── routes/
│   │   │   └── routes.jsx         # Route definitions
│   │   └── shared/
│   │       ├── AuthLayout/
│   │       ├── MasterLayout/
│   │       ├── Footer/
│   │       ├── NotFound/
│   │       └── components/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── docs/
│   ├── api-conventions.md
│   ├── backend-architecture-rules.md
│   ├── validation-rules.md
│   ├── questions-to-decide.md
│   ├── Yousef_EndPoints.txt
│   └── checklists/
│
├── package.json
├── README.md
└── .gitignore
```

---

## Data Models

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  password: String (required, min 8 chars, not selected by default),
  role: String (enum: ["tourist", "guide", "admin"], default: "tourist"),
  avatar: String (default: ""),
  isActive: Boolean (default: true),
  verificationStatus: String (enum: ["pending", "approved", "rejected"], default: "pending"),
  passwordResetToken: String (not selected by default),
  passwordResetExpires: Date (not selected by default),
  timestamps: true
}
```

**User Roles:**
- `tourist` - Can browse and book trips
- `guide` - Can create and manage trips
- `admin` - Full platform management

### Trip Model
```javascript
{
  title: String (required),
  description: String (required),
  location: String (required),
  price: Number (required),
  duration: String (required, e.g., "3 hours", "Full Day"),
  image: String (default: ""),
  guide: ObjectId (ref: User, required),
  category: String (enum: ["History", "Adventure", "Culture", "Food"], required),
  timestamps: true
}
```

**Trip Categories:**
- History
- Adventure
- Culture
- Food

### Booking Model
```javascript
{
  trip: ObjectId (ref: Trip, required),
  tourist: ObjectId (ref: User, required),
  date: Date (required),
  timeSlot: String (enum: ["Morning", "Afternoon", "Event"]),
  status: String (enum: ["pending", "confirmed", "cancelled"], default: "pending"),
  totalPrice: Number (required),
  timestamps: true
}
```

---

## API Architecture

### Base URL
```
/api
```

### Endpoints

#### Health Check
- `GET /health` - API health status

#### Authentication (`/api/auth`)
- Registration and login endpoints
- Password reset flow
- Token generation

#### Users (`/api/users`)
- User profile management
- User data retrieval

#### Trips (`/api/trips`)
- `GET /` - Get all trips (supports search, category, location filters)
- `POST /` - Create new trip (Guide/Admin only)

**Query Parameters for GET /trips:**
- `search` - Search in title/description (case-insensitive regex)
- `category` - Filter by category
- `location` - Filter by location (case-insensitive regex)

#### Bookings (`/api/bookings`)
- Create and manage bookings
- Booking status updates

#### Admin (`/api/admin`)
- Administrative operations

### Response Format
All API responses follow this structure:
```json
{
  "success": true/false,
  "message": "Description",
  "data": { /* response data */ },
  "count": 10  // for list endpoints
}
```

---

## Frontend Routing

### Route Structure

#### Public Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Welcome | Landing page |
| `/auth/login` | Login | User login |
| `/auth/register` | Register | User registration |
| `/auth/forget-password` | Forgetpassword | Password reset request |
| `/auth/reset-password` | ResetPassword | Password reset form |
| `/auth/application-received` | ApplicationReceived | Guide application confirmation |

#### Protected User Routes (`/user/*`)
| Path | Component | Description |
|------|-----------|-------------|
| `/user` | Home | User dashboard |
| `/user/home` | Home | User dashboard |
| `/user/discover` | Discover | Browse all trips |
| `/user/trips` | Trips | Trip listing |
| `/user/trips/info` | Info | Trip details |
| `/user/trips/book` | Book | Booking page |
| `/user/trips/book/status` | Status | Booking confirmation |
| `/user/trips/guide` | Guide | Guide profile |
| `/user/saved` | Saved | Saved trips |
| `/user/profile` | Profile | User profile |
| `/user/settings` | Settings | User settings |

#### Admin Routes (`/admin/*`)
| Path | Component | Description |
|------|-----------|-------------|
| `/admin` | Admin | Admin layout |
| `/admin/overview` | DashboardStatus | Dashboard overview |
| `/admin/accounts` | Accounts | User management |
| `/admin/cms` | CMS | Content management |
| `/admin/analytics` | Analytics | Platform analytics |
| `/admin/booking` | Booking | Booking management |

### Layouts
- **AuthLayout** - Shared layout for authentication pages
- **MasterLayout** - Main layout for user pages
- **Admin** - Admin-specific layout
- **NotFound** - 404 error page

---

## Key Features & Implementation Notes

### Authentication
- JWT-based authentication (planned/partial implementation)
- Password hashing with bcrypt (10 rounds)
- Password reset token system
- Role-based access control (tourist, guide, admin)

### Trip Discovery
- Full-text search across title and description
- Category filtering (History, Adventure, Culture, Food)
- Location-based filtering
- Guide information populated with trips

### Booking System
- Date and time slot selection (Morning, Afternoon, Event)
- Booking status tracking (pending, confirmed, cancelled)
- Price calculation and storage

### User Roles & Permissions
- **Tourist:** Browse trips, book guides, view booking history
- **Guide:** Create trips, manage listings, view ratings
- **Admin:** Full platform access, user management, content management, analytics

### Future Enhancements (Noted in Code)
- Document verification system (passport, national ID, guide license)
- File upload for verification documents
- Enhanced profile images
- Rating and review system

---

## Development Setup

### Prerequisites
- Node.js (latest LTS)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev        # Development with nodemon
npm start          # Production
npm run seed       # Seed database
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Environment Variables
Backend uses `.env` file (see `.env.example`):
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)

---

## Architecture Patterns

### Backend
- **MVC Pattern:** Controllers handle requests, Models define schemas, Routes define endpoints
- **Middleware Chain:** Auth → Validation → Controller → Error Handler
- **Async Handler Wrapper:** Consistent error handling for async operations
- **Service Layer:** Business logic separated from controllers

### Frontend
- **Component-Based:** Reusable UI components
- **Layout Pattern:** Shared layouts for different user types
- **State Management:** Redux Toolkit for global state
- **Routing:** React Router v7 with nested routes

---

## Code Conventions

### Backend
- ES6+ modules (import/export)
- Async/await for database operations
- JSDoc comments for API documentation
- Consistent error response format
- Mongoose schema validation

### Frontend
- Functional components with hooks
- CSS Modules for styling
- React Router for navigation
- Redux Toolkit for state management
- Bootstrap for responsive design

---

## Current Implementation Status

### Completed
- ✅ Project structure setup
- ✅ Backend server configuration
- ✅ MongoDB models (User, Trip, Booking)
- ✅ Basic trip CRUD operations
- ✅ Frontend routing structure
- ✅ Authentication pages (UI)
- ✅ User dashboard pages (UI)
- ✅ Admin dashboard pages (UI)
- ✅ Layout components

### In Progress / Planned
- ⏳ Full authentication implementation (JWT)
- ⏳ Authorization middleware
- ⏳ Complete booking flow
- ⏳ User profile management
- ⏳ Guide verification system
- ⏳ Rating and review system
- ⏳ Image upload functionality
- ⏳ Email notifications
- ⏳ Payment integration

---

## Important Notes for Development

1. **Authentication:** JWT implementation is planned but not fully integrated into all routes
2. **File Uploads:** Currently using string fields for images; file upload system not implemented
3. **Validation:** Joi validation schemas exist but may need expansion
4. **Error Handling:** Centralized error handling middleware in place
5. **Database Seeding:** Seed script available for initial data
6. **CORS:** Currently allowing all origins (should be restricted in production)
7. **Password Security:** bcrypt hashing implemented, passwords excluded from queries by default

---

## Git Repository
- **Remote:** https://github.com/mohamed-h-eng/Nefru.git
- **Latest Commit:** c4c627814c8c077f43bce1b701de83a347e992f0

---

## Documentation References
- `docs/api-conventions.md` - API design standards
- `docs/backend-architecture-rules.md` - Backend architecture guidelines
- `docs/validation-rules.md` - Validation requirements
- `docs/questions-to-decide.md` - Open architectural decisions
- `docs/Yousef_EndPoints.txt` - Endpoint specifications
- `docs/checklists/` - Development checklists

---

*Last Updated: 2025-06-21*