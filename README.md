# Marquee Booking System - Complete MERN Stack Application

A production-grade, scalable MERN stack application for managing a marriage hall/marquee booking business.

## 🏗️ Project Structure

```
marquee-booking-app/
├── backend/          # Node.js + Express.js API
├── frontend/         # Public landing website (React + Tailwind v4)
└── admin/            # Admin panel + CMS (React + Tailwind v4)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and email settings
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:5000/api
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Admin Panel Setup

```bash
cd admin
npm install
# Create .env file with VITE_API_URL=http://localhost:5000/api
npm run dev
```

Admin panel runs on `http://localhost:3001`

## 📋 Features

### Public Website
- ✅ Dynamic landing page
- ✅ About, Services, Hall Details pages
- ✅ Packages & Pricing
- ✅ Gallery with categories
- ✅ Testimonials
- ✅ FAQs
- ✅ Contact form
- ✅ Booking system with calendar

### Admin Panel & CMS
- ✅ Dashboard with statistics
- ✅ Booking management (approve/cancel/complete)
- ✅ Page content management
- ✅ Gallery management with image upload
- ✅ Packages management
- ✅ Services management
- ✅ Testimonials management
- ✅ FAQs management
- ✅ User management (Super Admin only)

### Backend API
- ✅ JWT Authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ Booking system with slot validation
- ✅ Email notifications
- ✅ Image upload handling
- ✅ RESTful API architecture
- ✅ Input validation
- ✅ Error handling

## 🔐 User Roles

- **super_admin**: Full system access
- **manager**: Booking and CMS management
- **staff**: Limited access
- **user**: Regular user access

## 📧 Email Configuration

Configure SMTP settings in `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@marquee-booking.com
```

## 🗄️ Database Models

- User
- Booking
- Page
- Gallery
- Package
- Service
- Testimonial
- FAQ

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Bookings
- `POST /api/bookings` - Create booking (public)
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/availability` - Get availability calendar
- `GET /api/bookings/slots` - Get available slots

### CMS (Public Read)
- `GET /api/cms/pages` - Get all pages
- `GET /api/cms/gallery` - Get gallery
- `GET /api/cms/packages` - Get packages
- `GET /api/cms/services` - Get services
- `GET /api/cms/testimonials` - Get testimonials
- `GET /api/cms/faqs` - Get FAQs

### CMS (Admin Write)
- `POST/PUT/DELETE /api/cms/*` - Manage CMS content

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/bookings` - All bookings
- `PATCH /api/admin/bookings/:id/status` - Update status
- `GET/POST/PUT/DELETE /api/admin/users` - User management

## 🛠️ Development

### Backend
```bash
cd backend
npm run dev    # Development with nodemon
npm start      # Production
```

### Frontend
```bash
cd frontend
npm run dev    # Development
npm run build  # Production build
```

### Admin
```bash
cd admin
npm run dev    # Development
npm run build  # Production build
```

## 📦 Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Build frontend: `cd frontend && npm run build`
3. Build admin: `cd admin && npm run build`
4. Serve frontend/admin builds with a web server (nginx, Apache, etc.)
5. Run backend with PM2 or similar process manager

## 🔒 Security Notes

- Change JWT_SECRET in production
- Use strong passwords for MongoDB
- Enable HTTPS in production
- Configure CORS properly
- Validate all inputs
- Use environment variables for secrets

## 📄 License

ISC

## 👥 Support

For issues and questions, please check the documentation in each project folder.
