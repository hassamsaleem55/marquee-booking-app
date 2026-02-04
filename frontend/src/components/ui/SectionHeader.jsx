export const SectionHeader = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16">
    <h2 className={`text-4xl md:text-5xl font-serif mb-6 ${light ? 'text-white' : 'text-stone-900'}`}>
      {title}
    </h2>
    <div className="w-16 h-[1px] bg-yellow-600 mx-auto" />
    {subtitle && (
      <p className={`mt-6 text-lg font-light max-w-2xl mx-auto ${light ? 'text-stone-400' : 'text-stone-500'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

import { Link } from 'react-router-dom';
export const GoldLink = ({ to, children, className = "" }) => (
  <Link 
    to={to} 
    className={`text-yellow-700 hover:text-stone-900 border-b border-yellow-600/30 pb-1 transition-colors uppercase text-xs tracking-widest font-bold ${className}`}
  >
    {children}
  </Link>
);