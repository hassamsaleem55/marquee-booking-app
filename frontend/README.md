# Marquee Booking Frontend

Public landing website for the Marquee Booking System built with React and Tailwind CSS v4.

## Features

- Responsive design
- Dynamic content from CMS
- Booking system integration
- User authentication and dashboard
- Gallery with categories
- Package and service listings
- Testimonials and FAQs
- Contact form

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

**Note:** If you encounter `spawn EPERM` errors on Windows, see `BUILD_TROUBLESHOOTING.md` for solutions.

## Pages

- Home - Landing page with featured content
- About - About us page
- Services - Service listings
- Hall Details - Venue information
- Packages - Package listings
- Gallery - Image gallery with categories
- Testimonials - Client testimonials
- FAQs - Frequently asked questions
- Contact - Contact form
- Booking - Booking form with calendar
- Login - User login page
- Register - User registration page
- Dashboard - User dashboard with booking history

## Build Output

After successful build, the production files will be in the `dist/` folder. These can be served by any static file server (nginx, Apache, Netlify, Vercel, etc.).