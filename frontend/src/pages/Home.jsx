import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cmsAPI } from '../utils/api';
import { SectionHeader, GoldLink } from '../components/ui/SectionHeader'; // Ensure you created this file
import { ArrowRight, Building2, Utensils, ShieldCheck } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState({ packages: [], testimonials: [], gallery: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgs, tests, gals] = await Promise.allSettled([
          cmsAPI.getPackages(),
          cmsAPI.getTestimonials({ featured: 'true' }),
          cmsAPI.getGallery({ featured: 'true' })
        ]);
        
        setData({
          packages: pkgs.status === 'fulfilled' ? pkgs.value.data.packages?.slice(0, 3) : [],
          testimonials: tests.status === 'fulfilled' ? tests.value.data.testimonials?.slice(0, 3) : [],
          gallery: gals.status === 'fulfilled' ? gals.value.data.gallery?.slice(0, 5) : []
        });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen bg-stone-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <Features />
      {data.packages.length > 0 && <PackageSection packages={data.packages} />}
      {data.gallery.length > 0 && <GalleryBento gallery={data.gallery} />}
      {data.testimonials.length > 0 && <TestimonialSection testimonials={data.testimonials} />}
      <CTA />
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const Hero = () => (
  <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img 
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
        className="w-full h-full object-cover animate-[pulse_10s_infinite] scale-105" 
        alt="Hero" 
      />
    </div>
    <div className="relative z-20 text-center animate-fade-in-up px-6">
      <span className="text-yellow-400 text-[10px] tracking-[0.3em] uppercase font-bold border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">Est. 2024</span>
      <h1 className="text-5xl md:text-8xl font-serif text-white my-8 leading-tight">Curating <span className="italic font-light text-yellow-500">Excellence</span></h1>
      <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
        <Link to="/booking" className="px-10 py-4 bg-white text-stone-950 text-xs font-bold uppercase tracking-widest hover:bg-yellow-600 hover:text-white transition-all">Reserve Date</Link>
        <Link to="/packages" className="px-10 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-950 transition-all">View Collections</Link>
      </div>
    </div>
  </header>
);

const Features = () => {
  const features = [
    { title: "Grand Architecture", desc: "Soaring ceilings and bespoke interiors designed to impress.", Icon: Building2 },
    { title: "Culinary Mastery", desc: "Menus crafted by executive chefs using the finest local ingredients.", Icon: Utensils },
    { title: "Concierge Service", desc: "A dedicated team ensuring flawless execution from start to finish.", Icon: ShieldCheck }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="The Experience" subtitle="We don't just host events; we craft experiences defined by precision and luxury." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
          {features.map((f, i) => (
            <div key={i} className="group text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-stone-400 group-hover:text-yellow-600 transition-colors duration-500">
                <f.Icon size={40} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-4 tracking-wide group-hover:text-yellow-700 transition-colors">{f.title}</h3>
              <p className="text-stone-500 leading-relaxed font-light text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PackageSection = ({ packages }) => (
  <section className="py-24 bg-stone-100">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <SectionHeader title="Curated Collections" subtitle="Select the tier that befits your occasion." />
        <GoldLink to="/packages" className="mb-20 hidden md:block">Compare All <ArrowRight size={14} className="inline ml-1" /></GoldLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <PackageCard key={pkg._id} pkg={pkg} featured={idx === 1} />
        ))}
      </div>
    </div>
  </section>
);

const PackageCard = ({ pkg, featured }) => (
  <div className={`bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 flex flex-col ${featured ? 'border-t-4 border-yellow-600 shadow-2xl scale-105 z-10' : ''}`}>
    <h3 className="text-2xl font-serif mb-4">{pkg.name}</h3>
    <div className="text-3xl font-serif mb-6">${pkg.price.toLocaleString()}<span className="text-xs text-stone-400 uppercase tracking-tighter ml-2">/ event</span></div>
    <ul className="space-y-3 mb-8 flex-grow">
      {pkg.features?.slice(0, 4).map((f, i) => (
        <li key={i} className="text-sm text-stone-600 flex gap-3">
          <span className="text-yellow-600">✦</span> {f}
        </li>
      ))}
    </ul>
    <Link to="/packages" className={`block w-full text-center py-4 text-xs font-bold uppercase tracking-widest ${featured ? 'bg-stone-900 text-white hover:bg-yellow-600' : 'bg-stone-50 text-stone-600 hover:bg-stone-200'}`}>View Details</Link>
  </div>
);

const GalleryBento = ({ gallery }) => (
  <section className="py-24 bg-stone-950 text-white">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <SectionHeader title="Visual Stories" light />
        <Link to="/gallery" className="text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-widest border-b border-transparent hover:border-white pb-1 mb-16">View Full Gallery</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {gallery.map((item, index) => (
          <div key={item._id} className={`relative group overflow-hidden bg-stone-900 ${index === 0 ? 'md:col-span-2 md:row-span-2' : index === 1 ? 'md:col-span-2' : ''}`}>
            <img 
              src={`http://localhost:5000${item.image}`} 
              alt="Gallery" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialSection = ({ testimonials }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <SectionHeader title="Client Perspectives" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        {testimonials.map((t) => (
          <div key={t._id} className="text-center px-4">
            <div className="text-yellow-400 text-5xl font-serif mb-4 opacity-40">"</div>
            <p className="text-stone-600 italic font-light leading-loose text-lg mb-8">{t.message}</p>
            <div className="font-bold text-stone-900 font-serif tracking-wide">{t.name}</div>
            <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Verified Client</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-28 bg-stone-900 text-center relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Begin Your Journey</h2>
      <p className="text-stone-400 mb-12 max-w-xl mx-auto font-light">Dates are limited. Contact our concierge team today to discuss your vision.</p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link to="/booking" className="px-12 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-white transition-all">Book Your Event</Link>
        <Link to="/contact" className="px-12 py-4 border border-stone-600 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition-all">Contact Us</Link>
      </div>
    </div>
  </section>
);

export default Home;