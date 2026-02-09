// import { Link, useLocation } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { ChevronDown, Menu, X } from 'lucide-react';

// const NavItem = ({ path, label, active, onClick }) => (
//   <Link
//     to={path}
//     onClick={onClick}
//     className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-2
//       ${active ? 'text-yellow-500' : 'text-stone-300 hover:text-white'}`}
//   >
//     {label}
//     <span className={`absolute bottom-0 left-0 h-px bg-yellow-500 transition-all duration-300 
//       ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
//     />
//   </Link>
// );

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const { pathname } = useLocation();
//   const { user, logout } = useAuth();
//   const userMenuRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/services', label: 'Services' },
//     { path: '/packages', label: 'Collections' },
//     { path: '/gallery', label: 'Gallery' },
//     { path: '/contact', label: 'Contact' }
//   ];

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
//       ${scrolled ? 'bg-stone-950/90 backdrop-blur-md py-3 border-white/10' : 'bg-transparent py-6 border-transparent'}`}>

//       <div className="container mx-auto px-6 flex justify-between items-center">
//         <Link to="/" className="z-50 group">
//           <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
//             MARQUEE <span className="font-light italic text-yellow-600 group-hover:text-white transition-colors">Venue</span>
//           </h1>
//         </Link>

//         {/* Desktop */}
//         <div className="hidden lg:flex items-center gap-8">
//           {navLinks.map(link => (
//             <NavItem key={link.path} {...link} active={pathname === link.path} />
//           ))}

//           <div className="flex items-center gap-6 ml-6 pl-6 border-l border-white/20">
//             {user ? (
//               <div className="relative" ref={userMenuRef}>
//                 <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 text-xs font-bold uppercase text-white hover:text-yellow-500 transition-colors">
//                   {user.name} <ChevronDown size={14} className={userMenuOpen ? 'rotate-180' : ''} />
//                 </button>
//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-4 w-48 bg-stone-900 border border-white/10 shadow-xl py-2">
//                     <Link to="/dashboard" className="block px-6 py-3 text-xs text-stone-300 hover:text-yellow-500">Dashboard</Link>
//                     <button onClick={logout} className="w-full text-left px-6 py-3 text-xs text-stone-300 hover:text-yellow-500">Sign Out</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="text-xs font-bold uppercase text-white hover:text-yellow-500">Sign In</Link>
//                 <Link to="/booking" className="px-6 py-2.5 border border-yellow-600 text-yellow-500 text-xs font-bold uppercase hover:bg-yellow-600 hover:text-white transition-all">Book Now</Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Toggle */}
//         <button className="lg:hidden z-50 text-white" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={32} /> : <Menu size={32} />}
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div className={`fixed inset-0 bg-stone-950 z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         {navLinks.map(link => (
//           <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-3xl font-serif text-white ${pathname === link.path ? 'text-yellow-500 italic' : ''}`}>
//             {link.label}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// };

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, Menu, X } from 'lucide-react';

const NavItem = ({ path, label, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group py-2
      ${active ? 'text-gold-500' : 'text-stone-300 hover:text-white'}`}
  >
    {label}
    <span className={`absolute bottom-0 left-0 h-px bg-gold-500 transition-all duration-300 ease-out
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

  // Check if we are on the homepage
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/packages', label: 'Packages' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  // Determine Navbar Style based on Page and Scroll State
  const navbarClasses = (isHomePage && !scrolled)
    ? 'bg-transparent py-8 border-transparent' // Transparent on Home (unscrolled)
    : 'bg-stone-950/95 backdrop-blur-md py-4 border-white/10 shadow-md'; // Dark on inner pages OR scrolled

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${navbarClasses}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="z-50 group">
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            MARQUEE <span className="font-light italic text-gold-500 group-hover:text-white transition-colors duration-500">Venue</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <NavItem key={link.path} {...link} active={pathname === link.path} />
          ))}

          <div className="flex items-center gap-6 ml-6 pl-6 border-l border-white/10">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gold-500 transition-colors"
                >
                  {user.name} <ChevronDown size={14} className={`transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-6 w-56 bg-stone-950 border border-stone-800 shadow-2xl py-2 animate-fade-in-up">
                    <div className="px-6 py-3 border-b border-stone-800 mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-stone-500">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-gold-500 hover:bg-stone-900 transition-colors">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-red-400 hover:bg-stone-900 transition-colors">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-gold-500 transition-colors">
                  Sign In
                </Link>
                <Link to="/booking" className="btn-outline px-6 py-3 border-gold-500 text-gold-500 hover:bg-gold-500 hover:border-gold-500 hover:text-white">
                  Book Now
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden z-50 text-white hover:text-gold-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-950 z-40 transition-all duration-700 ease-in-out flex flex-col items-center justify-center gap-8 lg:hidden 
        ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>

        {navLinks.map((link, idx) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`text-3xl font-serif transition-colors duration-300 ${pathname === link.path ? 'text-gold-500 italic' : 'text-white hover:text-stone-300'}`}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {link.label}
          </Link>
        ))}

        <div className="w-16 h-px bg-stone-800 my-4"></div>

        {user ? (
          <div className="flex flex-col items-center gap-6">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.2em] text-white">Dashboard</Link>
            <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Sign Out</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.2em] text-white">Sign In</Link>
            <Link to="/booking" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-[0.2em] text-gold-500 border border-gold-500 px-8 py-3">Book Now</Link>
          </div>
        )}
      </div>
    </nav>
  );
};