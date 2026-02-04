import Booking from '../models/Booking.model.js';
import { checkSlotAvailability, getAvailableSlots as getAvailableSlotsUtil } from '../utils/bookingValidation.js';
import { sendBookingConfirmation, sendAdminNotification, sendBookingApproval, sendBookingCancellation } from '../utils/emailService.js';
import { validationResult } from 'express-validator';

export const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      guestName,
      guestEmail,
      guestPhone,
      eventDate,
      startTime,
      endTime,
      eventType,
      guestCount,
      package: packageId,
      services,
      specialRequests
    } = req.body;

    // Check slot availability
    const availability = await checkSlotAvailability(eventDate, startTime, endTime);
    if (!availability.available) {
      return res.status(400).json({
        message: 'Time slot is not available',
        conflict: availability.conflict
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user?.id || null,
      guestName,
      guestEmail,
      guestPhone,
      eventDate,
      startTime,
      endTime,
      eventType,
      guestCount,
      package: packageId || null,
      services: services || [],
      specialRequests
    });

    // Send emails
    await sendBookingConfirmation(booking, guestEmail);
    if (process.env.EMAIL_USER) {
      await sendAdminNotification(booking, process.env.EMAIL_USER);
    }

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    // Admin can see all bookings
    const { status, date, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.eventDate = { $gte: startDate, $lt: endDate };
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('package')
      .populate('services')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('package')
      .populate('services');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (req.user.role !== 'super_admin' && req.user.role !== 'manager' && booking.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package')
      .populate('services')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check permissions
    if (req.user.role !== 'super_admin' && req.user.role !== 'manager' && booking.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // If updating date/time, check availability
    if (req.body.eventDate || req.body.startTime || req.body.endTime) {
      const eventDate = req.body.eventDate || booking.eventDate;
      const startTime = req.body.startTime || booking.startTime;
      const endTime = req.body.endTime || booking.endTime;

      const availability = await checkSlotAvailability(eventDate, startTime, endTime, booking._id);
      if (!availability.available) {
        return res.status(400).json({
          message: 'Time slot is not available',
          conflict: availability.conflict
        });
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('package').populate('services');

    res.json({
      success: true,
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check permissions
    if (req.user.role !== 'super_admin' && req.user.role !== 'manager' && booking.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Send cancellation email
    await sendBookingCancellation(booking, booking.guestEmail, req.body.reason);

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailability = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      eventDate: { $gte: start, $lte: end },
      status: { $in: ['pending', 'approved'] }
    }).select('eventDate startTime endTime');

    // Group by date
    const availability = {};
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayBookings = bookings.filter(b => 
        b.eventDate.toISOString().split('T')[0] === dateStr
      );
      
      availability[dateStr] = {
        date: dateStr,
        totalSlots: 14, // 9 AM to 11 PM = 14 slots
        bookedSlots: dayBookings.length,
        availableSlots: 14 - dayBookings.length,
        status: dayBookings.length === 14 ? 'fully_booked' : dayBookings.length > 0 ? 'partial' : 'available'
      };
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json({
      success: true,
      availability
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const slots = await getAvailableSlotsUtil(date);
    res.json({
      success: true,
      ...slots
    });
  } catch (error) {
    next(error);
  }
};
