// import { useEffect, useState } from 'react';
// import { cmsAPI } from '../utils/api';
// import { Link } from 'react-router-dom';

// const Packages = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await cmsAPI.getPackages();
//         setPackages(response.data.packages || []);
//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };
//     fetchPackages();
//   }, []);

//   return (
//     <div className="section-padding">
//       <div className="container-custom">
//         <h1 className="text-4xl font-bold text-center mb-8">Our Packages</h1>
//         <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//           Choose from our carefully curated packages designed to make your event unforgettable.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {packages.map((pkg) => (
//             <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               {pkg.image && (
//                 <img
//                   src={`http://localhost:5000${pkg.image}`}
//                   alt={pkg.name}
//                   className="w-full h-64 object-cover"
//                 />
//               )}
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
//                 <p className="text-gray-600 mb-4">{pkg.description}</p>
//                 <div className="text-3xl font-bold text-blue-600 mb-4">${pkg.price}</div>
//                 <div className="mb-4">
//                   <span className="text-sm text-gray-600">Capacity: </span>
//                   <span className="font-semibold">{pkg.capacity} guests</span>
//                 </div>
//                 <ul className="space-y-2 mb-6">
//                   {pkg.features?.map((feature, idx) => (
//                     <li key={idx} className="flex items-center text-sm">
//                       <span className="text-green-500 mr-2">✓</span>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <Link to="/booking" className="btn-primary w-full text-center block">
//                   Book This Package
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {packages.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No packages available at the moment.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Packages;


import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await cmsAPI.getPackages();
        setPackages(response.data.packages || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="section-padding bg-stone-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Selection</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Curated Packages</h1>
          <p className="text-stone-500 text-lg font-light max-w-2xl mx-auto">
            Choose from our carefully curated collections designed to make your event unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg._id} className={`bg-white flex flex-col transition-all duration-500 border hover:shadow-2xl hover:-translate-y-2 ${index === 1 ? 'border-gold-500 shadow-xl relative scale-105 z-10' : 'border-stone-100 shadow-sm'}`}>
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              {pkg.image && (
                <div className="h-64 overflow-hidden">
                  <img
                    src={`http://localhost:5000${pkg.image}`}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif text-stone-900 mb-2">{pkg.name}</h3>
                <p className="text-stone-500 text-sm font-light mb-6 min-h-[40px]">{pkg.description}</p>
                
                <div className="mb-8 pb-8 border-b border-stone-100">
                  <span className="text-4xl font-serif text-stone-900">${pkg.price}</span>
                  <span className="text-stone-400 text-xs uppercase ml-2">/ Event</span>
                </div>
                
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Capacity</span>
                    <span className="font-bold text-stone-900">{pkg.capacity} guests</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-stone-600 font-light">
                      <Check size={16} className="text-gold-500 mr-3 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to="/booking" className={index === 1 ? "btn-primary w-full" : "btn-secondary w-full"}>
                  Reserve Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
           <div className="text-center py-20">
             <p className="text-stone-400 font-serif text-xl italic">No packages available at the moment.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Packages;