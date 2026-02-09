// import { useEffect, useState } from 'react';
// import { cmsAPI } from '../utils/api';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
//         const response = await cmsAPI.getServices(params);
//         setServices(response.data.services || []);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };
//     fetchServices();
//   }, [selectedCategory]);

//   const categories = ['all', 'catering', 'decoration', 'photography', 'addon'];

//   return (
//     <div className="section-padding">
//       <div className="container-custom">
//         <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                 selectedCategory === cat
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {services.map((service) => (
//             <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               {service.image && (
//                 <img
//                   src={`http://localhost:5000${service.image}`}
//                   alt={service.name}
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{service.name}</h3>
//                 <p className="text-gray-600 mb-4">{service.description}</p>
//                 <div className="text-2xl font-bold text-blue-600">${service.price}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {services.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No services found in this category.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const response = await cmsAPI.getServices(params);
        setServices(response.data.services || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [selectedCategory]);

  const categories = ['all', 'catering', 'decoration', 'photography', 'addon'];

  return (
    <div className="section-padding bg-stone-50">
      <div className="container-custom">
        <div className="text-center mb-16">
           <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Excellence</span>
           <h1 className="text-4xl md:text-5xl font-serif text-stone-900">Our Services</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-transparent text-stone-500 border-stone-200 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service._id} className="card-premium group">
              {service.image && (
                <div className="overflow-hidden h-64 w-full relative">
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all z-10"/>
                  <img
                    src={`http://localhost:5000${service.image}`}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif text-stone-900 mb-3 group-hover:text-gold-600 transition-colors">{service.name}</h3>
                <div className="h-px w-10 bg-stone-200 mx-auto mb-4"></div>
                <p className="text-stone-500 mb-6 font-light text-sm leading-relaxed">{service.description}</p>
                <div className="text-xl font-serif text-gold-600">${service.price}</div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 font-serif text-xl italic">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;