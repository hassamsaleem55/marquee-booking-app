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