import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Pages from './pages/cms/Pages';
import Gallery from './pages/cms/Gallery';
import Packages from './pages/cms/Packages';
import Services from './pages/cms/Services';
import Testimonials from './pages/cms/Testimonials';
import FAQs from './pages/cms/FAQs';
import Users from './pages/Users';
import Layout from './components/Layout';
import { authAPI } from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/*"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/cms/pages" element={<Pages />} />
                  <Route path="/cms/gallery" element={<Gallery />} />
                  <Route path="/cms/packages" element={<Packages />} />
                  <Route path="/cms/services" element={<Services />} />
                  <Route path="/cms/testimonials" element={<Testimonials />} />
                  <Route path="/cms/faqs" element={<FAQs />} />
                  {(user.role === 'super_admin') && (
                    <Route path="/users" element={<Users />} />
                  )}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
