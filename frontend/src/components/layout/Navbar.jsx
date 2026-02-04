// import { Link, useLocation } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const userMenuRef = useRef(null);

//   // Handle Scroll Effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close menus on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [userMenuOpen]);

//   const isActive = (path) => location.pathname === path;

//   const navLinks = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/services', label: 'Services' },
//     { path: '/packages', label: 'Packages' },
//     { path: '/gallery', label: 'Gallery' },
//     { path: '/contact', label: 'Contact' }
//   ];

//   return (
//     <nav 
//       className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
//         ${scrolled 
//           ? 'bg-stone-950/90 backdrop-blur-md py-3 border-white/10 shadow-2xl' 
//           : 'bg-transparent py-6 border-transparent'
//         }`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex justify-between items-center">

//           {/* Logo */}
//           <Link to="/" className="z-50 group">
//             <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide transition-colors">
//               MARQUEE <span className="font-light italic text-yellow-600 group-hover:text-white transition-colors">Venue</span>
//             </h1>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-2
//                   ${isActive(link.path) ? 'text-yellow-500' : 'text-stone-300 hover:text-white'}
//                 `}
//               >
//                 {link.label}
//                 <span className={`absolute bottom-0 left-0 h-[1px] bg-yellow-500 transition-all duration-300 ease-out
//                   ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} 
//                 />
//               </Link>
//             ))}

//             {/* User / Auth Section */}
//             {user ? (
//               <div className="relative ml-6 pl-6 border-l border-white/20" ref={userMenuRef}>
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-white hover:text-yellow-500 transition-colors"
//                 >
//                   <span>{user.name}</span>
//                   <svg className={`w-3 h-3 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* User Dropdown */}
//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-4 w-56 bg-stone-900 border border-white/10 shadow-xl py-2 animate-fade-in-up origin-top-right">
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-6 py-3 text-xs uppercase tracking-widest text-stone-300 hover:bg-white/5 hover:text-yellow-500 transition-colors"
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={() => { logout(); setUserMenuOpen(false); }}
//                       className="block w-full text-left px-6 py-3 text-xs uppercase tracking-widest text-stone-300 hover:bg-white/5 hover:text-yellow-500 transition-colors"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center gap-6 ml-6 pl-6 border-l border-white/20">
//                 <Link to="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-yellow-500 transition-colors">
//                   Sign In
//                 </Link>
//                 <Link to="/booking" className="px-6 py-2.5 border border-yellow-600 text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-600 hover:text-white transition-all duration-300">
//                   Book Now
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden z-50 text-white hover:text-yellow-500 transition-colors p-2"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div className={`fixed inset-0 bg-stone-950/98 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out flex items-center justify-center lg:hidden
//         ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
//       >
//         <div className="flex flex-col items-center space-y-8 p-6 w-full">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`text-3xl font-serif text-white hover:text-yellow-500 transition-colors ${isActive(link.path) ? 'text-yellow-500 italic' : ''}`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="h-[1px] w-24 bg-white/10 my-6" />
//           {user ? (
//             <div className="flex flex-col items-center gap-6">
//               <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm font-sans uppercase tracking-widest text-stone-400">Dashboard</Link>
//               <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm font-sans uppercase tracking-widest text-stone-400">Sign Out</button>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center gap-6 w-full max-w-xs">
//               <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-sans uppercase tracking-widest text-stone-400 hover:text-white">Sign In</Link>
//               <Link to="/booking" onClick={() => setIsOpen(false)} className="w-full py-4 border border-yellow-600 text-yellow-500 text-center text-sm font-sans font-bold uppercase tracking-widest hover:bg-yellow-600 hover:text-white transition-colors">Book Now</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, Menu, X } from 'lucide-react';

const NavItem = ({ path, label, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-2
      ${active ? 'text-yellow-500' : 'text-stone-300 hover:text-white'}`}
  >
    {label}
    <span className={`absolute bottom-0 left-0 h-[1px] bg-yellow-500 transition-all duration-300 
      ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
    />
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/packages', label: 'Collections' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
      ${scrolled ? 'bg-stone-950/90 backdrop-blur-md py-3 border-white/10' : 'bg-transparent py-6 border-transparent'}`}>

      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="z-50 group">
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            MARQUEE <span className="font-light italic text-yellow-600 group-hover:text-white transition-colors">Venue</span>
          </h1>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <NavItem key={link.path} {...link} active={pathname === link.path} />
          ))}

          <div className="flex items-center gap-6 ml-6 pl-6 border-l border-white/20">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 text-xs font-bold uppercase text-white hover:text-yellow-500 transition-colors">
                  {user.name} <ChevronDown size={14} className={userMenuOpen ? 'rotate-180' : ''} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-stone-900 border border-white/10 shadow-xl py-2">
                    <Link to="/dashboard" className="block px-6 py-3 text-xs text-stone-300 hover:text-yellow-500">Dashboard</Link>
                    <button onClick={logout} className="w-full text-left px-6 py-3 text-xs text-stone-300 hover:text-yellow-500">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-xs font-bold uppercase text-white hover:text-yellow-500">Sign In</Link>
                <Link to="/booking" className="px-6 py-2.5 border border-yellow-600 text-yellow-500 text-xs font-bold uppercase hover:bg-yellow-600 hover:text-white transition-all">Book Now</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden z-50 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-950 z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map(link => (
          <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-3xl font-serif text-white ${pathname === link.path ? 'text-yellow-500 italic' : ''}`}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};