import express from 'express';
import {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
const adminOnly = [authenticate, authorize('super_admin', 'manager')];
const superAdminOnly = [authenticate, authorize('super_admin')];

// Dashboard
router.get('/dashboard', ...adminOnly, getDashboardStats);

// Bookings
router.get('/bookings', ...adminOnly, getAllBookings);
router.patch('/bookings/:id/status', ...adminOnly, updateBookingStatus);

// Users (Super Admin only)
router.get('/users', ...superAdminOnly, getUsers);
router.post('/users', ...superAdminOnly, createUser);
router.put('/users/:id', ...superAdminOnly, updateUser);
router.delete('/users/:id', ...superAdminOnly, deleteUser);

export default router;
