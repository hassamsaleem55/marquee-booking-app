import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI, authAPI } from '../utils/api';
import { Calendar, Clock, Users, FileText, LogOut, User, Edit2, X, Check } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile State
  const [profileData, setProfileData] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookings();
    setProfileData({ name: user.name, phone: user.phone || '' });
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await authAPI.updateProfile(profileData);
      setEditingProfile(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-stone-100 text-stone-600 border-stone-200',
      approved: 'bg-stone-900 text-gold-500 border-stone-900',
      cancelled: 'bg-red-50 text-red-900 border-red-100',
      completed: 'bg-green-50 text-green-900 border-green-100'
    };
    return (
      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  const inputClass = "w-full px-4 py-2 bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 text-stone-900 text-sm transition-all";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1";

  if (!user) return null;

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-stone-200 animate-fade-in-up">
          <div>
            <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-2 block">Client Portal</span>
            <h1 className="text-4xl font-serif text-stone-900">Welcome, {user.name.split(' ')[0]}</h1>
          </div>
          <p className="text-stone-400 text-sm mt-4 md:mt-0 font-light">
            Manage your personal details and upcoming events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Profile Card */}
          <div className="lg:col-span-4 space-y-8 animate-fade-in-up delay-100">
            <div className="bg-white p-8 shadow-sm border border-stone-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300">
                   <User size={32} strokeWidth={1} />
                </div>
                {!editingProfile && (
                  <button onClick={() => setEditingProfile(true)} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-gold-500 transition-colors flex items-center gap-1">
                    Edit <Edit2 size={12}/>
                  </button>
                )}
              </div>

              {editingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <div><label className={labelClass}>Full Name</label><input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className={inputClass} required /></div>
                  <div><label className={labelClass}>Phone Number</label><input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className={inputClass} /></div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={profileLoading} className="flex-1 btn-primary py-2 text-xs">{profileLoading ? 'Saving...' : 'Save Changes'}</button>
                    <button type="button" onClick={() => setEditingProfile(false)} className="px-4 py-2 border border-stone-200 text-stone-500 hover:bg-stone-50 text-xs font-bold uppercase"><X size={14}/></button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <p className="font-serif text-xl text-stone-900 border-b border-stone-100 pb-2">{user.name}</p>
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <p className="font-serif text-xl text-stone-900 border-b border-stone-100 pb-2">{user.email}</p>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <p className="font-serif text-xl text-stone-900 border-b border-stone-100 pb-2">{user.phone || '—'}</p>
                  </div>
                </div>
              )}

              <button onClick={handleLogout} className="mt-8 w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-red-800 transition-colors py-4 border-t border-stone-100">
                <LogOut size={14} /> Sign Out
              </button>
            </div>

            {/* Support Box */}
            <div className="bg-stone-900 p-8 text-center text-stone-400">
              <h3 className="text-white font-serif text-lg mb-2">Need Assistance?</h3>
              <p className="text-xs mb-6 font-light leading-relaxed">Our concierge team is available 24/7 to assist with your reservations.</p>
              <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-all">Contact Concierge</Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Bookings */}
          <div className="lg:col-span-8 animate-fade-in-up delay-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-stone-900">Event History</h2>
              <Link to="/booking" className="btn-primary py-3 px-6 text-[10px]">
                + New Reservation
              </Link>
            </div>

            {loading ? (
              <div className="p-12 text-center border border-dashed border-stone-200">
                <span className="text-stone-400 text-sm animate-pulse">Loading records...</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-12 text-center border border-stone-100 shadow-sm">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mx-auto mb-6">
                  <Calendar size={32} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-2">No Reservations Found</h3>
                <p className="text-stone-500 text-sm font-light mb-8 max-w-sm mx-auto">
                  You have not made any bookings yet. Start your journey by reserving a date.
                </p>
                <Link to="/booking" className="btn-secondary">Book Your First Event</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white group hover:shadow-xl transition-all duration-500 border border-stone-100 relative overflow-hidden">
                    {/* Status Stripe */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${booking.status === 'approved' ? 'bg-gold-500' : booking.status === 'pending' ? 'bg-stone-300' : 'bg-red-200'}`}></div>

                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center min-w-20 p-4 bg-stone-50 border border-stone-100">
                        <span className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                          {new Date(booking.eventDate).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-3xl font-serif text-stone-900">
                          {new Date(booking.eventDate).getDate()}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(booking.eventDate).getFullYear()}
                        </span>
                      </div>

                      {/* Main Details */}
                      <div className="flex-1 space-y-2">
                         <div className="flex justify-between items-start">
                           <h3 className="text-xl font-serif text-stone-900 capitalize">
                             {booking.eventType} Reception
                           </h3>
                           {getStatusBadge(booking.status)}
                         </div>
                         
                         <div className="flex flex-wrap gap-4 text-sm text-stone-500 font-light mt-2">
                            <span className="flex items-center gap-2"><Clock size={14} className="text-gold-500"/> {booking.startTime} - {booking.endTime}</span>
                            <span className="flex items-center gap-2"><Users size={14} className="text-gold-500"/> {booking.guestCount} Guests</span>
                            {booking.totalAmount > 0 && (
                              <span className="flex items-center gap-2 text-stone-900 font-medium">
                                $ {booking.totalAmount.toLocaleString()}
                              </span>
                            )}
                         </div>
                      </div>
                    </div>

                    {/* Footer / Notes Section */}
                    {(booking.specialRequests || booking.notes) && (
                      <div className="px-6 md:px-8 py-4 bg-stone-50 border-t border-stone-100 flex flex-col md:flex-row gap-8">
                        {booking.specialRequests && (
                          <div className="flex-1">
                             <p className={labelClass}>My Requests</p>
                             <p className="text-xs text-stone-600 font-light italic">"{booking.specialRequests}"</p>
                          </div>
                        )}
                        {booking.notes && (
                          <div className="flex-1">
                             <p className={labelClass}>Concierge Notes</p>
                             <div className="flex items-start gap-2">
                               <Check size={12} className="text-gold-500 mt-1" />
                               <p className="text-xs text-stone-900">{booking.notes}</p>
                             </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;