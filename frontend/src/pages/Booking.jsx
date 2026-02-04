import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Booking = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    eventDate: '',
    startTime: '',
    endTime: '',
    eventType: 'wedding',
    guestCount: '',
    package: '',
    services: [],
    specialRequests: ''
  });

  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Pre-fill form if user is logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        guestName: user.name || '',
        guestEmail: user.email || '',
        guestPhone: user.phone || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (formData.eventDate) {
      fetchAvailableSlots(formData.eventDate);
    }
  }, [formData.eventDate]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await bookingAPI.getAvailableSlots({ date });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter(s => s !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, eventDate: dateStr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await bookingAPI.createBooking(formData);
      setMessage({ type: 'success', text: 'Booking request submitted successfully! We will contact you soon.' });
      setFormData({
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        eventType: 'wedding',
        guestCount: '',
        package: '',
        services: [],
        specialRequests: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit booking. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Book Your Event
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill out the form below to request a booking. We'll get back to you within 24 hours.
          </p>
          {!user && (
            <p className="text-sm text-gray-500 mt-4">
              <Link to="/login" className="text-gray-900 font-semibold hover:underline">Sign in</Link>
              {' or '}
              <Link to="/register" className="text-gray-900 font-semibold hover:underline">create an account</Link>
              {' to track your bookings'}
            </p>
          )}
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-md border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <span className="font-medium text-sm">{message.text}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-premium p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Guest Name *</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Email *</label>
              <input
                type="email"
                name="guestEmail"
                value={formData.guestEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Phone *</label>
              <input
                type="tel"
                name="guestPhone"
                value={formData.guestPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Event Type *</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
              >
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Guest Count *</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
                placeholder="Number of guests"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Event Date *</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">Start Time *</label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
              >
                <option value="">Select start time</option>
                {availableSlots
                  .filter(slot => slot.available)
                  .map((slot, idx) => (
                    <option key={idx} value={slot.start}>{slot.start}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">End Time *</label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
              >
                <option value="">Select end time</option>
                {availableSlots
                  .filter(slot => slot.available && (!formData.startTime || slot.start > formData.startTime))
                  .map((slot, idx) => (
                    <option key={idx} value={slot.end}>{slot.end}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold mb-3 text-gray-700">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white resize-none"
              placeholder="Any special requirements or requests..."
            />
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-md border border-gray-200">
            <label className="block text-sm font-semibold mb-4 text-gray-900">Select Date</label>
            <div className="flex justify-center">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                className="rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Booking Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
