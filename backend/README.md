# Marquee Booking Backend API

Backend REST API for the Marquee Booking System built with Node.js, Express.js, and MongoDB.

## Features

- JWT Authentication & Authorization
- Role-Based Access Control (RBAC)
- Booking Management with Slot Validation
- CMS APIs for Content Management
- Email Notifications
- Image Upload Handling
- Input Validation
- Error Handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - MongoDB connection string
   - JWT secret
   - Email SMTP settings
   - Frontend URLs

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Bookings
- `POST /api/bookings` - Create booking (public)
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get booking details
- `GET /api/bookings/my-bookings` - Get user bookings
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/availability` - Get availability calendar
- `GET /api/bookings/slots` - Get available slots for date

### CMS
- Pages: `GET/POST/PUT/DELETE /api/cms/pages`
- Gallery: `GET/POST/PUT/DELETE /api/cms/gallery`
- Packages: `GET/POST/PUT/DELETE /api/cms/packages`
- Services: `GET/POST/PUT/DELETE /api/cms/services`
- Testimonials: `GET/POST/PUT/DELETE /api/cms/testimonials`
- FAQs: `GET/POST/PUT/DELETE /api/cms/faqs`

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/bookings` - All bookings with filters
- `PATCH /api/admin/bookings/:id/status` - Update booking status
- `GET /api/admin/users` - Get all users (super admin)
- `POST /api/admin/users` - Create user (super admin)
- `PUT /api/admin/users/:id` - Update user (super admin)
- `DELETE /api/admin/users/:id` - Delete user (super admin)

### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## Roles

- `super_admin` - Full access
- `manager` - Booking and CMS management
- `staff` - Limited access
- `user` - Regular user access

## Database Models

- User
- Booking
- Page
- Gallery
- Package
- Service
- Testimonial
- FAQ
