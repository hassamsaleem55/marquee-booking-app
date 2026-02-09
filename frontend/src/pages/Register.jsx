// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

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

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);

//     const result = await register(
//       formData.name,
//       formData.email,
//       formData.password,
//       formData.phone
//     );
    
//     if (result.success) {
//       navigate('/dashboard');
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
//             <h1 className="text-3xl font-semibold mb-2 text-gray-900">Create Account</h1>
//             <p className="text-gray-600">Sign up to manage your bookings</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold mb-2 text-gray-900">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="John Doe"
//               />
//             </div>

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
//               <label className="block text-sm font-semibold mb-2 text-gray-900">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="+1 (555) 123-4567"
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
//                 minLength={6}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="At least 6 characters"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2 text-gray-900">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white text-sm"
//                 placeholder="Confirm your password"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Creating account...' : 'Create Account'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-gray-900 font-semibold hover:underline">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password, formData.phone);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm text-stone-800 placeholder-stone-400";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-stone-900 mb-2";

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center section-padding">
      <div className="container-custom max-w-md w-full">
        <div className="card-premium p-10 md:p-14 border-t-4 border-stone-900">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-stone-900 mb-2">Membership</h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest">Begin Your Journey</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-2 border-red-500">
              <p className="text-xs text-red-800 font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your.email@example.com" />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 123-4567" />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={inputClass} />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary mt-4">
              {loading ? 'Processing...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-stone-100 pt-6">
            <p className="text-sm text-stone-500 font-light">
              Already a member?{' '}
              <Link to="/login" className="text-stone-900 font-semibold hover:text-gold-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;