import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';

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
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-8">Testimonials</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Read what our clients have to say about their experience with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">
                  {'★'.repeat(testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
              <div className="flex items-center">
                {testimonial.image && (
                  <img
                    src={`http://localhost:5000${testimonial.image}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.email && (
                    <div className="text-sm text-gray-500">{testimonial.email}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
