import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cmsAPI } from '../utils/api';
import { ShieldCheck, Award, HeartHandshake, PenTool } from 'lucide-react';

const About = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reliable luxury fallback image
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop";

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await cmsAPI.getPage('about');
        setPage(response.data.page);
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchPage();
  }, []);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  const imageSource = page?.bannerImage 
    ? `http://localhost:5000${page.bannerImage}` 
    : FALLBACK_IMAGE;
  
  const title = page?.title || "The Art of Celebration";
  const content = page?.content || `
    <p>Welcome to Marquee Venue, where timeless elegance meets modern luxury. Established with a vision to redefine the art of hosting, we curate environments that transform fleeting moments into everlasting memories.</p>
    <p>Our philosophy is rooted in precision and passion. We believe that a venue is more than just a physical space; it is the canvas upon which your life's most significant stories are painted. From the architectural grandeur of our ceilings to the bespoke service provided by our concierge team, every detail is orchestrated to perfection.</p>
    <p>Whether you are planning an intimate union or a grand corporate gala, our commitment remains the same: to provide an experience of uncompromising quality.</p>
  `;

  if (loading) {
    return (
      <div className="h-screen bg-stone-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-gold-500 rounded-full animate-spin mb-4"></div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Curating Experience</span>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* 1. Hero / Header Section */}
      <section className="pt-40 pb-20 px-6 container mx-auto text-center animate-fade-in-up">
        <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Est. 2024</span>
        <h1 className="text-5xl md:text-7xl font-serif text-stone-950 mb-8">{title}</h1>
        <div className="w-px h-24 bg-gold-500 mx-auto"></div>
      </section>

      {/* 2. Main Editorial Section */}
      <section className="pb-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="relative order-2 lg:order-1 animate-fade-in-up delay-100">
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-500/30 z-0 hidden md:block"></div>
            <div className="relative z-10 overflow-hidden shadow-2xl bg-stone-200">
              <img
                src={imageSource}
                onError={handleImageError}
                alt="Venue Interior"
                className="w-full h-125 object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl max-w-xs hidden md:block z-20 border-t-2 border-gold-500">
              <p className="font-serif italic text-stone-600 text-lg">"Excellence is not an act, but a habit."</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in-up delay-200">
            <h2 className="text-3xl font-serif text-stone-900 mb-8">Our Philosophy</h2>
            <div
              className="prose prose-stone prose-lg max-w-none font-light text-stone-600 leading-relaxed 
                         prose-headings:font-serif prose-headings:text-stone-900 prose-a:text-gold-500"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">General Manager</p>
                <p className="font-serif text-2xl text-stone-900">Alexander Sterling</p>
              </div>
              <PenTool className="text-gold-500 opacity-50" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (Icon Grid) - FIXED VISIBILITY */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Item 1 */}
            <div className="px-4 py-4 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500 text-gold-500 group-hover:text-white">
                <ShieldCheck size={28} strokeWidth={1} />
              </div>
              {/* Added text-white explicitly to override global h3 color */}
              <h3 className="text-xl font-serif mb-3 tracking-wide text-white">Uncompromising Privacy</h3>
              {/* Lightened text color to stone-300 for contrast against dark background */}
              <p className="text-stone-300 text-sm leading-loose font-light">
                We ensure discretion and security for high-profile gatherings and intimate celebrations alike.
              </p>
            </div>

            {/* Item 2 */}
            <div className="px-4 py-4 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500 text-gold-500 group-hover:text-white">
                <Award size={28} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif mb-3 tracking-wide text-white">World-Class Service</h3>
              <p className="text-stone-300 text-sm leading-loose font-light">
                Our concierge team is dedicated to anticipating your needs before they are spoken.
              </p>
            </div>

            {/* Item 3 */}
            <div className="px-4 py-4 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500 text-gold-500 group-hover:text-white">
                <HeartHandshake size={28} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-serif mb-3 tracking-wide text-white">Bespoke Curation</h3>
              <p className="text-stone-300 text-sm leading-loose font-light">
                No two events are alike. We tailor every aesthetic detail to your personal vision.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Experience It In Person</h2>
        <p className="text-stone-500 font-light mb-10 max-w-xl mx-auto">
          We invite you to schedule a private tour of the grounds with our events director.
        </p>
        <Link to="/contact" className="btn-secondary px-10 py-4">
          Request A Tour
        </Link>
      </section>

    </div>
  );
};

export default About;