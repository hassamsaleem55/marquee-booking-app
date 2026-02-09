// import { useEffect, useState } from 'react';
// import { cmsAPI } from '../utils/api';

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await cmsAPI.getTestimonials();
//         setTestimonials(response.data.testimonials || []);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="section-padding">
//       <div className="container-custom">
//         <h1 className="text-4xl font-bold text-center mb-8">Testimonials</h1>
//         <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//           Read what our clients have to say about their experience with us.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg">
//               <div className="flex items-center mb-4">
//                 <div className="text-yellow-400 text-xl">
//                   {'★'.repeat(testimonial.rating)}
//                 </div>
//               </div>
//               <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
//               <div className="flex items-center">
//                 {testimonial.image && (
//                   <img
//                     src={`http://localhost:5000${testimonial.image}`}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-3 object-cover"
//                   />
//                 )}
//                 <div>
//                   <div className="font-semibold">{testimonial.name}</div>
//                   {testimonial.email && (
//                     <div className="text-sm text-gray-500">{testimonial.email}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {testimonials.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No testimonials available at the moment.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;


import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await cmsAPI.getTestimonials();
        setTestimonials(response.data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="section-padding bg-stone-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Feedback</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Client Perspectives</h1>
          <p className="text-stone-500 font-light max-w-2xl mx-auto">
            Stories of celebration from those who have experienced the venue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="card-premium p-10 flex flex-col">
              <div className="flex mb-6 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < testimonial.rating ? "#d4af37" : "none"} 
                    className={i < testimonial.rating ? "text-gold-400" : "text-stone-200"}
                  />
                ))}
              </div>
              <div className="text-gold-500 text-4xl font-serif leading-none mb-4 opacity-30">"</div>
              <p className="text-stone-600 font-light leading-loose mb-8 italic flex-1">
                {testimonial.message}
              </p>
              <div className="flex items-center pt-6 border-t border-stone-100">
                {testimonial.image ? (
                  <img
                    src={`http://localhost:5000${testimonial.image}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border border-stone-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full mr-4 bg-stone-100 flex items-center justify-center text-stone-400 font-serif">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-stone-900 font-serif tracking-wide">{testimonial.name}</div>
                  {testimonial.email && (
                    <div className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Verified Client</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 font-serif italic">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;