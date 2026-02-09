// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/dashboard';

//   useEffect(() => {
//     if (user) {
//       navigate(from);
//     }
//   }, [user, navigate, from]);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const result = await login(formData.email, formData.password);
    
//     if (result.success) {
//       navigate(from);
//     } else {
//       setError(result.message);
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="section-padding bg-white min-h-screen flex items-center">
//       <div className="container-custom max-w-md w-full">
//         <div className="card-premium p-8 md:p-10">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-semibold mb-2 text-gray-900">Sign In</h1>
//             <p className="text-gray-600">Access your account to manage bookings</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold mb-2 text-gray-900">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="your.email@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2 text-gray-900">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/register" className="text-gray-900 font-semibold hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) navigate(from);
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) navigate(from);
    else setError(result.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center section-padding">
      <div className="container-custom max-w-md w-full">
        <div className="card-premium p-10 md:p-14 border-t-4 border-gold-500">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-stone-900 mb-2">Welcome Back</h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest">Client Portal</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-2 border-red-500">
              <p className="text-xs text-red-800 font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-900 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm text-stone-800 placeholder-stone-400"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm text-stone-800"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-4"
            >
              {loading ? 'Authenticating...' : 'Access Account'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-stone-100 pt-6">
            <p className="text-sm text-stone-500 font-light">
              New to Marquee?{' '}
              <Link to="/register" className="text-stone-900 font-semibold hover:text-gold-500 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;