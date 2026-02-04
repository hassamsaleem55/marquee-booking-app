# Setup Guide

## Initial Setup Steps

### 1. Install MongoDB

**Option A: Local MongoDB**
- Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/marquee-booking
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marquee-booking

JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Email Configuration (Optional for testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@marquee-booking.com

FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

Start backend:
```bash
npm run dev
```

Seed initial data (creates admin user and sample content):
```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@marquee.com`
- Password: `admin123`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Admin Panel Setup

```bash
cd admin
npm install
```

Create `admin/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start admin panel:
```bash
npm run dev
```

Visit: `http://localhost:3001`

Login with admin credentials created in step 2.

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend loads at localhost:3000
- [ ] Admin panel loads at localhost:3001
- [ ] Can login to admin panel
- [ ] Can view dashboard
- [ ] Can create a booking from frontend
- [ ] Can see booking in admin panel

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify .env file exists and has correct values
- Check if port 5000 is available

### Frontend/Admin won't connect to API
- Verify backend is running
- Check VITE_API_URL in .env files
- Check CORS settings in backend

### Can't login to admin
- Run seed script: `cd backend && npm run seed`
- Verify user exists in database
- Check JWT_SECRET in backend .env

### Images not uploading
- Check uploads directory exists: `backend/uploads/`
- Verify file permissions
- Check MAX_FILE_SIZE in backend .env

## Next Steps

1. Create additional admin users through admin panel
2. Add content via CMS (pages, gallery, packages, etc.)
3. Configure email settings for notifications
4. Customize frontend design
5. Set up production environment
