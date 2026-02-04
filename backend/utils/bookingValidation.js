import Booking from '../models/Booking.model.js';

export const checkSlotAvailability = async (eventDate, startTime, endTime, excludeBookingId = null) => {
  try {
    const date = new Date(eventDate);
    date.setHours(0, 0, 0, 0);

    const query = {
      eventDate: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
      },
      status: { $in: ['pending', 'approved'] }
    };

    if (excludeBookingId) {
      query._id = { $ne: excludeBookingId };
    }

    const existingBookings = await Booking.find(query);

    // Check for time overlap
    for (const booking of existingBookings) {
      const existingStart = booking.startTime;
      const existingEnd = booking.endTime;

      // Check if times overlap
      if (
        (startTime >= existingStart && startTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (startTime <= existingStart && endTime >= existingEnd)
      ) {
        return {
          available: false,
          conflict: {
            bookingId: booking._id,
            time: `${existingStart} - ${existingEnd}`
          }
        };
      }
    }

    return { available: true };
  } catch (error) {
    console.error('Error checking slot availability:', error);
    return { available: false, error: error.message };
  }
};

export const getAvailableSlots = async (date) => {
  try {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const bookings = await Booking.find({
      eventDate: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['pending', 'approved'] }
    }).select('startTime endTime');

    // Define available time slots (9 AM to 11 PM)
    const allSlots = [];
    for (let hour = 9; hour < 23; hour++) {
      allSlots.push({
        start: `${hour.toString().padStart(2, '0')}:00`,
        end: `${(hour + 1).toString().padStart(2, '0')}:00`
      });
    }

    // Mark slots as booked
    const bookedSlots = bookings.map(b => ({
      start: b.startTime,
      end: b.endTime
    }));

    return {
      date: date,
      totalSlots: allSlots.length,
      bookedSlots: bookedSlots.length,
      availableSlots: allSlots.length - bookedSlots.length,
      slots: allSlots.map(slot => {
        const isBooked = bookedSlots.some(booked =>
          (slot.start >= booked.start && slot.start < booked.end) ||
          (slot.end > booked.start && slot.end <= booked.end) ||
          (slot.start <= booked.start && slot.end >= booked.end)
        );
        return {
          ...slot,
          available: !isBooked
        };
      })
    };
  } catch (error) {
    console.error('Error getting available slots:', error);
    throw error;
  }
};
