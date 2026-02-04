// import { Link } from 'react-router-dom';
// import { 
//   Instagram, 
//   Facebook, 
//   Linkedin, 
//   MapPin, 
//   Phone, 
//   Mail 
// } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-stone-950 text-stone-300 border-t border-white/10 font-sans">
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

//           {/* Brand Column */}
//           <div className="md:col-span-1">
//             <Link to="/" className="block mb-6">
//               <h3 className="text-2xl font-serif text-white tracking-wide">
//                 MARQUEE <span className="italic text-yellow-600 font-light">Venue</span>
//               </h3>
//             </Link>
//             <p className="text-sm leading-relaxed text-stone-400 mb-8 font-light">
//               Curating exceptional environments for life's most significant moments. Your premier destination for elegant events.
//             </p>
//             <div className="flex space-x-4">
//                {/* Social Icons */}
//                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center transition-all duration-300 hover:border-yellow-600 hover:text-yellow-500 group">
//                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
//                </a>
//                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center transition-all duration-300 hover:border-yellow-600 hover:text-yellow-500 group">
//                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
//                </a>
//                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center transition-all duration-300 hover:border-yellow-600 hover:text-yellow-500 group">
//                  <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
//                </a>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Explore</h4>
//             <ul className="space-y-4 text-sm text-stone-400">
//               <li><Link to="/about" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">About Us</Link></li>
//               <li><Link to="/services" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Services</Link></li>
//               <li><Link to="/packages" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Collections</Link></li>
//               <li><Link to="/gallery" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Gallery</Link></li>
//             </ul>
//           </div>

//           {/* Concierge/Support */}
//           <div>
//             <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Concierge</h4>
//             <ul className="space-y-4 text-sm text-stone-400">
//               <li><Link to="/faqs" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">FAQs</Link></li>
//               <li><Link to="/contact" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Contact Us</Link></li>
//               <li><Link to="/booking" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Reserve Date</Link></li>
//               <li><Link to="/login" className="hover:text-yellow-500 transition-all hover:pl-2 duration-300 block">Client Portal</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Visit Us</h4>
//             <ul className="space-y-6 text-sm text-stone-300">
//               <li className="flex items-start group">
//                 <MapPin size={20} className="text-yellow-600 mr-4 shrink-0 group-hover:text-white transition-colors" />
//                 <span className="leading-relaxed">123 Grand Avenue,<br/>Beverly Hills, CA 90210</span>
//               </li>
//               <li className="flex items-center group">
//                 <Phone size={18} className="text-yellow-600 mr-4 shrink-0 group-hover:text-white transition-colors" />
//                 +1 (555) 123-4567
//               </li>
//               <li className="flex items-center group">
//                 <Mail size={18} className="text-yellow-600 mr-4 shrink-0 group-hover:text-white transition-colors" />
//                 events@marquee-luxury.com
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-stone-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
//           <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Marquee Venue. All rights reserved.</p>
//           <div className="flex space-x-8">
//             <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
//             <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    explore: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Collections', to: '/packages' },
      { label: 'Gallery', to: '/gallery' },
    ],
    concierge: [
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Reserve Date', to: '/booking' },
      { label: 'Client Portal', to: '/login' },
    ]
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-white/10 font-sans py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        <div className="md:col-span-1">
          <h3 className="text-2xl font-serif text-white mb-6">MARQUEE <span className="italic text-yellow-600 font-light">Venue</span></h3>
          <p className="text-sm leading-relaxed mb-8 font-light">Curating exceptional environments for life's most significant moments.</p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:border-yellow-600 hover:text-yellow-500 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">{title}</h4>
            <ul className="space-y-4 text-sm">
              {links.map(link => (
                <li key={link.to}><Link to={link.to} className="hover:text-yellow-500 hover:pl-2 transition-all duration-300 block">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Visit Us</h4>
          <ul className="space-y-6 text-sm text-stone-300">
            <li className="flex gap-4"><MapPin className="text-yellow-600" size={20} /> 123 Grand Ave, Beverly Hills, CA</li>
            <li className="flex gap-4"><Phone className="text-yellow-600" size={18} /> +1 (555) 123-4567</li>
            <li className="flex gap-4"><Mail className="text-yellow-600" size={18} /> events@marquee.com</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-stone-900 mt-20 pt-8 flex flex-col md:flex-row justify-between text-xs">
        <p>&copy; {new Date().getFullYear()} Marquee Venue. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};