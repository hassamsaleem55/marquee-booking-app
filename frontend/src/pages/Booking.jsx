// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { bookingAPI, cmsAPI } from '../utils/api'; // Added cmsAPI for packages
// import { useAuth } from '../context/AuthContext';
// import Calendar from 'react-calendar';
// import { Check, Clock, Users, Star } from 'lucide-react';
// import 'react-calendar/dist/Calendar.css';

// // Predefined Luxury Time Slots
// const TIME_SLOTS = [
//   { id: 'morning', label: 'Morning Elegance', time: '09:00 AM - 01:00 PM', value: { start: '09:00', end: '13:00' } },
//   { id: 'afternoon', label: 'Afternoon Delight', time: '02:00 PM - 06:00 PM', value: { start: '14:00', end: '18:00' } },
//   { id: 'evening', label: 'Grand Evening', time: '07:00 PM - 12:00 AM', value: { start: '19:00', end: '00:00' } }
// ];

// const Booking = () => {
//   const { user } = useAuth();
  
//   // State
//   const [packages, setPackages] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const [formData, setFormData] = useState({
//     guestName: user?.name || '',
//     guestEmail: user?.email || '',
//     guestPhone: user?.phone || '',
//     eventType: 'wedding',
//     guestCount: '',
//     packageId: '', // Changed to store ID
//     specialRequests: ''
//   });

//   // Fetch Packages on Mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await cmsAPI.getPackages();
//         setPackages(res.data.packages || []);
//       } catch (error) {
//         console.error("Error loading packages", error);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // Update form if user logs in
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         guestName: user.name || '',
//         guestEmail: user.email || '',
//         guestPhone: user.phone || ''
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setSelectedSlot(null); // Reset slot on date change to ensure availability check (if needed later)
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedSlot) {
//       setMessage({ type: 'error', text: 'Please select a time slot for your event.' });
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     const payload = {
//       ...formData,
//       eventDate: selectedDate.toISOString().split('T')[0],
//       startTime: selectedSlot.value.start,
//       endTime: selectedSlot.value.end,
//       // Map package ID to name if backend expects name, or send ID
//       // package: packages.find(p => p._id === formData.packageId)?.name || 'Custom'
//       package: formData.packageId
//     };

//     try {
//       await bookingAPI.createBooking(payload);
//       setMessage({ type: 'success', text: 'Request received. Our concierge will contact you shortly to finalize details.' });
//       // Reset form logic here if needed
//     } catch (error) {
//       setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit booking.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Styling Classes
//   const inputClass = "w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-stone-400";
//   const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2";

//   return (
//     <div className="section-padding bg-stone-50 min-h-screen">
//       <div className="container-custom max-w-6xl">
        
//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in-up">
//           <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Reservations</span>
//           <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Curate Your Experience</h1>
//           <p className="text-stone-500 font-light max-w-2xl mx-auto">
//             Select your preferred date and collection. Availability is real-time.
//           </p>
//         </div>

//         {/* Status Message */}
//         {message.text && (
//           <div className={`mb-10 p-4 flex items-center justify-center gap-3 ${message.type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-50 text-red-900 border border-red-200'}`}>
//             {message.type === 'success' && <Check size={18} className="text-gold-500" />}
//             <span className="font-serif tracking-wide">{message.text}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
//           {/* LEFT COLUMN: Date & Time (Calendar) */}
//           <div className="lg:col-span-7 space-y-8 animate-fade-in-up delay-100">
            
//             {/* Calendar Widget */}
//             <div className="bg-white p-8 shadow-sm border border-stone-100">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-gold-600"><Clock size={16}/></div>
//                 <h3 className="font-serif text-xl text-stone-900">Select Date</h3>
//               </div>
              
//               <div className="calendar-luxury-wrapper">
//                 <Calendar 
//                   onChange={handleDateChange} 
//                   value={selectedDate} 
//                   minDate={new Date()}
//                   className="w-full border-none font-sans text-stone-600"
//                   tileClassName={({ activeDate, date, view }) => 
//                     `p-4 hover:bg-stone-50 transition-colors rounded-sm text-sm font-medium
//                     ${view === 'month' && date.getDay() === 0 ? 'text-stone-400' : ''}`
//                   }
//                 />
//               </div>
//             </div>

//             {/* Time Slots */}
//             <div>
//               <h3 className="font-serif text-xl text-stone-900 mb-6 flex items-center gap-3">
//                 Select Session <span className="text-stone-300 text-sm font-sans font-normal uppercase tracking-wider">(Required)</span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {TIME_SLOTS.map((slot) => (
//                   <div 
//                     key={slot.id}
//                     onClick={() => setSelectedSlot(slot)}
//                     className={`cursor-pointer p-6 border transition-all duration-300 relative group
//                       ${selectedSlot?.id === slot.id 
//                         ? 'bg-stone-900 border-stone-900 text-white shadow-xl transform -translate-y-1' 
//                         : 'bg-white border-stone-200 text-stone-500 hover:border-gold-500 hover:text-stone-900'}`}
//                   >
//                     {selectedSlot?.id === slot.id && (
//                       <div className="absolute top-3 right-3 text-gold-500"><Check size={16} /></div>
//                     )}
//                     <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${selectedSlot?.id === slot.id ? 'text-gold-500' : 'text-stone-400'}`}>
//                       {slot.id}
//                     </p>
//                     <p className="font-serif text-lg mb-1">{slot.label}</p>
//                     <p className="text-xs opacity-70">{slot.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Details Form */}
//           <div className="lg:col-span-5 space-y-8 animate-fade-in-up delay-200">
            
//             {/* Personal Info Card */}
//             <div className="bg-white p-8 shadow-sm border border-stone-100">
//               <h3 className="font-serif text-xl text-stone-900 mb-6">Guest Details</h3>
//               <div className="space-y-5">
//                 <div><label className={labelClass}>Full Name</label><input type="text" name="guestName" value={formData.guestName} onChange={handleChange} required className={inputClass} placeholder="John Doe" /></div>
//                 <div><label className={labelClass}>Email Address</label><input type="email" name="guestEmail" value={formData.guestEmail} onChange={handleChange} required className={inputClass} placeholder="john@example.com" /></div>
//                 <div><label className={labelClass}>Phone Number</label><input type="tel" name="guestPhone" value={formData.guestPhone} onChange={handleChange} required className={inputClass} placeholder="+1 (555) 000-0000" /></div>
//               </div>
//             </div>

//             {/* Event Specifics Card */}
//             <div className="bg-white p-8 shadow-sm border border-stone-100">
//               <h3 className="font-serif text-xl text-stone-900 mb-6">Event Specifics</h3>
//               <div className="space-y-5">
                
//                 {/* Event Type & Guests Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Event Type</label>
//                     <select name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
//                       <option value="wedding">Wedding</option>
//                       <option value="corporate">Corporate</option>
//                       <option value="birthday">Social</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Guests</label>
//                     <div className="relative">
//                       <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} min="1" required className={`${inputClass} pl-10`} placeholder="100" />
//                       <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Package Selection */}
//                 <div>
//                   <label className={labelClass}>Select Collection</label>
//                   <div className="relative">
//                     <select name="packageId" value={formData.packageId} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
//                       <option value="">Select a package...</option>
//                       {packages.map(pkg => (
//                         <option key={pkg._id} value={pkg._id}>
//                           {pkg.name} — ${pkg.price.toLocaleString()}
//                         </option>
//                       ))}
//                     </select>
//                     <Star size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
//                   </div>
//                   <p className="text-[10px] text-stone-400 mt-2 text-right">
//                     <Link to="/packages" className="hover:text-gold-500 transition-colors border-b border-stone-300 hover:border-gold-500 pb-0.5">View Collection Details</Link>
//                   </p>
//                 </div>

//                 {/* Special Requests */}
//                 <div>
//                   <label className={labelClass}>Notes / Requests</label>
//                   <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className={inputClass} placeholder="Dietary restrictions, color themes..." />
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" disabled={loading} className="w-full btn-primary py-5 text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1">
//               {loading ? 'Processing Request...' : 'Confirm Reservation'}
//             </button>
//             <p className="text-center text-xs text-stone-400 font-light mt-4">
//               No payment required today. Availability is subject to confirmation.
//             </p>

//           </div>
//         </form>
//       </div>

//       {/* CSS Overrides for React Calendar to make it Luxury */}
//       <style>{`
//         .calendar-luxury-wrapper .react-calendar { width: 100%; border: none; font-family: 'Montserrat', sans-serif; }
//         .calendar-luxury-wrapper .react-calendar__navigation { margin-bottom: 20px; }
//         .calendar-luxury-wrapper .react-calendar__navigation button { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; min-width: 44px; background: none; }
//         .calendar-luxury-wrapper .react-calendar__navigation button:enabled:hover,
//         .calendar-luxury-wrapper .react-calendar__navigation button:enabled:focus { background-color: #f5f5f4; }
//         .calendar-luxury-wrapper .react-calendar__month-view__weekdays { text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; color: #d4af37; font-weight: 700; text-decoration: none; }
//         .calendar-luxury-wrapper abbr[title] { text-decoration: none; }
//         .calendar-luxury-wrapper .react-calendar__tile { padding: 1.5em 0.5em; color: #44403c; font-weight: 500; }
//         .calendar-luxury-wrapper .react-calendar__tile--now { background: #fafaf9; color: #d4af37; font-weight: bold; border: 1px solid #e7e5e4; }
//         .calendar-luxury-wrapper .react-calendar__tile--now:enabled:hover,
//         .calendar-luxury-wrapper .react-calendar__tile--now:enabled:focus { background: #f5f5f4; }
//         .calendar-luxury-wrapper .react-calendar__tile--active { background: #1c1917 !important; color: white !important; }
//         .calendar-luxury-wrapper .react-calendar__tile:enabled:hover,
//         .calendar-luxury-wrapper .react-calendar__tile:enabled:focus { background-color: #f5f5f4; color: #1c1917; }
//       `}</style>
//     </div>
//   );
// };

// export default Booking; 


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI, cmsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Calendar from 'react-calendar';
import { Check, Clock, Users, Star, AlertCircle } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

// Predefined Luxury Time Slots with Fixed Start Times
const TIME_SLOTS = [
  { id: 'morning', label: 'Morning Elegance', time: '09:00 AM - 01:00 PM', value: { start: '09:00', end: '13:00' } },
  { id: 'afternoon', label: 'Afternoon Delight', time: '02:00 PM - 06:00 PM', value: { start: '14:00', end: '18:00' } },
  { id: 'evening', label: 'Grand Evening', time: '07:00 PM - 12:00 AM', value: { start: '19:00', end: '00:00' } }
];

const Booking = () => {
  const { user } = useAuth();
  
  // Data State
  const [packages, setPackages] = useState([]);
  const [bookedDatesMap, setBookedDatesMap] = useState({}); // Map of 'YYYY-MM-DD' -> ['morning', 'evening']
  
  // UI State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form State
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    eventType: 'wedding',
    guestCount: '',
    packageId: '',
    specialRequests: ''
  });

  // 1. Initial Data Fetching (Packages & Availability)
  useEffect(() => {
    const init = async () => {
      try {
        const [pkgRes, slotsRes] = await Promise.all([
          cmsAPI.getPackages(),
          // Assuming an endpoint that returns ALL future approved bookings
          // If your API only supports per-date, this needs to be adjusted.
          bookingAPI.getAvailableSlots({}) 
        ]);

        setPackages(pkgRes.data.packages || []);

        // Process Bookings into a Map for easy lookup
        // Expected format from API: Array of bookings with { eventDate: '2024-10-10', startTime: '09:00' }
        const rawBookings = slotsRes.data.bookings || slotsRes.data.slots || [];
        const map = {};

        rawBookings.forEach(booking => {
          // Normalize date string (ensure YYYY-MM-DD)
          const dateStr = new Date(booking.eventDate).toISOString().split('T')[0];
          
          // Determine which slot ID matches the booking start time
          let slotId = null;
          if (booking.startTime === '09:00') slotId = 'morning';
          else if (booking.startTime === '14:00') slotId = 'afternoon';
          else if (booking.startTime === '19:00') slotId = 'evening';

          if (slotId) {
            if (!map[dateStr]) map[dateStr] = [];
            map[dateStr].push(slotId);
          }
        });

        setBookedDatesMap(map);

      } catch (error) {
        console.error("Error initializing booking data", error);
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, []);

  // 2. Auth Pre-fill
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        guestName: user.name || '',
        guestEmail: user.email || '',
        guestPhone: user.phone || ''
      }));
    }
  }, [user]);

  // Helpers
  const formatDateKey = (date) => date.toISOString().split('T')[0];

  const isSlotBooked = (date, slotId) => {
    const key = formatDateKey(date);
    return bookedDatesMap[key]?.includes(slotId);
  };

  const isDateFullyBooked = (date) => {
    const key = formatDateKey(date);
    // If a date has 3 bookings, it is fully booked
    return bookedDatesMap[key]?.length >= 3;
  };

  // Handlers
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot choice when changing date
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setMessage({ type: 'error', text: 'Please select an available time slot.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const payload = {
      ...formData,
      eventDate: formatDateKey(selectedDate),
      startTime: selectedSlot.value.start,
      endTime: selectedSlot.value.end,
      package: formData.packageId // Backend should handle ID lookup or we pass name
    };

    try {
      await bookingAPI.createBooking(payload);
      
      // Optimistic Update: Add this slot to our local map so it disables immediately
      const key = formatDateKey(selectedDate);
      setBookedDatesMap(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), selectedSlot.id]
      }));

      setMessage({ type: 'success', text: 'Reservation request submitted successfully.' });
      // Optional: Clear specific form fields
      setFormData(prev => ({ ...prev, specialRequests: '', guestCount: '', eventType: 'wedding' }));
      setSelectedSlot(null);
      
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit booking.' });
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const inputClass = "w-full px-4 py-3 bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm placeholder-stone-400";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2";

  if (pageLoading) return <div className="h-screen bg-stone-50 flex items-center justify-center text-stone-400 uppercase text-xs tracking-widest">Loading Availability...</div>;

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Reservations</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Secure Your Date</h1>
          <p className="text-stone-500 font-light max-w-2xl mx-auto">
            Select your preferred date and collection. Fully booked dates are disabled.
          </p>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-10 p-4 flex items-center justify-center gap-3 ${message.type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-50 text-red-900 border border-red-200'}`}>
            {message.type === 'success' ? <Check size={18} className="text-gold-500" /> : <AlertCircle size={18} />}
            <span className="font-serif tracking-wide">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Date & Time */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up delay-100">
            
            {/* Calendar Widget */}
            <div className="bg-white p-8 shadow-sm border border-stone-100 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-gold-600"><Clock size={16}/></div>
                <h3 className="font-serif text-xl text-stone-900">Select Date</h3>
              </div>
              
              <div className="calendar-luxury-wrapper">
                <Calendar 
                  onChange={handleDateChange} 
                  value={selectedDate} 
                  minDate={new Date()}
                  // Disable date if it has 3 bookings in the map
                  tileDisabled={({ date, view }) => view === 'month' && isDateFullyBooked(date)}
                  className="w-full border-none font-sans text-stone-600"
                  tileClassName={({ date, view }) => {
                    const isFull = isDateFullyBooked(date);
                    // Add a dot indicator if partially booked (1 or 2 slots taken)
                    const partial = !isFull && bookedDatesMap[formatDateKey(date)]?.length > 0;
                    
                    return `p-4 hover:bg-stone-50 transition-colors rounded-sm text-sm font-medium relative
                    ${view === 'month' && date.getDay() === 0 ? 'text-stone-400' : ''}
                    ${partial ? 'partial-booked-date' : ''}`;
                  }}
                />
              </div>
              
              {/* Legend */}
              <div className="flex gap-4 mt-4 justify-center text-[10px] uppercase tracking-wider text-stone-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-200"></div> Available</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gold-500"></div> Selected</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-100 border border-stone-200 text-stone-300 relative overflow-hidden"><div className="absolute inset-0 bg-stone-300 opacity-20 transform -skew-x-12"></div></div> Fully Booked</div>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-serif text-xl text-stone-900 mb-6 flex items-center gap-3">
                Select Session <span className="text-stone-300 text-sm font-sans font-normal uppercase tracking-wider">(Required)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TIME_SLOTS.map((slot) => {
                  const booked = isSlotBooked(selectedDate, slot.id);
                  const selected = selectedSlot?.id === slot.id;

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={booked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`text-left p-6 border transition-all duration-300 relative group
                        ${booked 
                          ? 'bg-stone-50 border-stone-100 opacity-50 cursor-not-allowed grayscale' 
                          : selected
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xl transform -translate-y-1' 
                            : 'bg-white border-stone-200 text-stone-500 hover:border-gold-500 hover:text-stone-900'
                        }`}
                    >
                      {selected && <div className="absolute top-3 right-3 text-gold-500"><Check size={16} /></div>}
                      {booked && <div className="absolute top-3 right-3 text-red-300 text-[10px] uppercase font-bold tracking-widest">Booked</div>}
                      
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${selected ? 'text-gold-500' : 'text-stone-400'}`}>
                        {slot.id}
                      </p>
                      <p className="font-serif text-lg mb-1">{slot.label}</p>
                      <p className="text-xs opacity-70">{slot.time}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details Form */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up delay-200">
            
            {/* Personal Info Card */}
            <div className="bg-white p-8 shadow-sm border border-stone-100">
              <h3 className="font-serif text-xl text-stone-900 mb-6">Guest Details</h3>
              <div className="space-y-5">
                <div><label className={labelClass}>Full Name</label><input type="text" name="guestName" value={formData.guestName} onChange={handleChange} required className={inputClass} placeholder="John Doe" /></div>
                <div><label className={labelClass}>Email Address</label><input type="email" name="guestEmail" value={formData.guestEmail} onChange={handleChange} required className={inputClass} placeholder="john@example.com" /></div>
                <div><label className={labelClass}>Phone Number</label><input type="tel" name="guestPhone" value={formData.guestPhone} onChange={handleChange} required className={inputClass} placeholder="+1 (555) 000-0000" /></div>
              </div>
            </div>

            {/* Event Specifics Card */}
            <div className="bg-white p-8 shadow-sm border border-stone-100">
              <h3 className="font-serif text-xl text-stone-900 mb-6">Event Specifics</h3>
              <div className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleChange} className={inputClass}>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate</option>
                      <option value="birthday">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Guests</label>
                    <div className="relative">
                      <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} min="1" required className={`${inputClass} pl-10`} placeholder="100" />
                      <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    </div>
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <label className={labelClass}>Select Collection</label>
                  <div className="relative">
                    <select name="packageId" value={formData.packageId} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer pr-8`}>
                      <option value="">Select a package...</option>
                      {packages.map(pkg => (
                        <option key={pkg._id} value={pkg._id}>
                          {pkg.name} — ${pkg.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <Star size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-stone-400 mt-2 text-right">
                    <Link to="/packages" className="hover:text-gold-500 transition-colors border-b border-stone-300 hover:border-gold-500 pb-0.5">View Collection Details</Link>
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Notes / Requests</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className={inputClass} placeholder="Dietary restrictions, color themes..." />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full btn-primary py-5 text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? 'Processing Request...' : 'Confirm Reservation'}
            </button>
            <p className="text-center text-xs text-stone-400 font-light mt-4">
              Availability is subject to confirmation by our concierge.
            </p>

          </div>
        </form>
      </div>

      {/* CSS Overrides for React Calendar */}
      <style>{`
        .calendar-luxury-wrapper .react-calendar { width: 100%; border: none; font-family: 'Montserrat', sans-serif; }
        .calendar-luxury-wrapper .react-calendar__navigation { margin-bottom: 20px; }
        .calendar-luxury-wrapper .react-calendar__navigation button { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; min-width: 44px; background: none; }
        .calendar-luxury-wrapper .react-calendar__navigation button:enabled:hover { background-color: #f5f5f4; }
        .calendar-luxury-wrapper .react-calendar__month-view__weekdays { text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; color: #d4af37; font-weight: 700; text-decoration: none; }
        .calendar-luxury-wrapper abbr[title] { text-decoration: none; }
        .calendar-luxury-wrapper .react-calendar__tile { padding: 1.5em 0.5em; color: #44403c; font-weight: 500; }
        
        /* Selected State */
        .calendar-luxury-wrapper .react-calendar__tile--now { background: #fafaf9; color: #d4af37; font-weight: bold; border: 1px solid #e7e5e4; }
        .calendar-luxury-wrapper .react-calendar__tile--active { background: #1c1917 !important; color: white !important; }
        
        /* Disabled (Fully Booked) State */
        .calendar-luxury-wrapper .react-calendar__tile:disabled { background-color: #f5f5f4 !important; color: #d6d3d1 !important; text-decoration: line-through; cursor: not-allowed; opacity: 0.6; }
        
        /* Partially Booked Indicator (Dot) */
        .partial-booked-date::after {
          content: ''; position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; background-color: #d4af37; border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Booking;