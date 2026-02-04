import express from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getBookings,
  getBooking,
  getUserBookings,
  updateBooking,
  cancelBooking,
  getAvailability,
  getAvailableSlots
} from '../controllers/booking.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

const bookingValidation = [
  body('guestName').trim().notEmpty().withMessage('Guest name is required'),
  body('guestEmail').isEmail().withMessage('Please provide a valid email'),
  body('guestPhone').trim().notEmpty().withMessage('Guest phone is required'),
  body('eventDate').notEmpty().withMessage('Event date is required'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required'),
  body('eventType').isIn(['wedding', 'birthday', 'corporate', 'other']).withMessage('Invalid event type'),
  body('guestCount').isInt({ min: 1 }).withMessage('Guest count must be at least 1')
];

// Public routes
router.post('/', bookingValidation, createBooking);
router.get('/availability', getAvailability);
router.get('/slots', getAvailableSlots);

// Authenticated routes
router.get('/my-bookings', authenticate, getUserBookings);
router.get('/:id', authenticate, getBooking);
router.put('/:id', authenticate, updateBooking);
router.patch('/:id/cancel', authenticate, cancelBooking);

// Admin routes (will be protected by admin middleware in controller)
router.get('/', authenticate, getBookings);

export default router;
