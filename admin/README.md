# Marquee Booking Admin Panel

Admin panel and CMS for the Marquee Booking System built with React and Tailwind CSS v4.

## Features

- Dashboard with statistics
- Booking management with status updates
- CMS for managing:
  - Pages
  - Gallery
  - Packages
  - Services
  - Testimonials
  - FAQs
- User management (Super Admin only)
- Image upload functionality
- Role-based access control

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Access

- Default admin credentials need to be created via backend
- Login at `/login`
- Access is role-based (super_admin, manager, staff)
