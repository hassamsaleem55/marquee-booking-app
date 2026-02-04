import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';
import { Link } from 'react-router-dom';

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
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-8">Our Packages</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our carefully curated packages designed to make your event unforgettable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {pkg.image && (
                <img
                  src={`http://localhost:5000${pkg.image}`}
                  alt={pkg.name}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-blue-600 mb-4">${pkg.price}</div>
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Capacity: </span>
                  <span className="font-semibold">{pkg.capacity} guests</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="btn-primary w-full text-center block">
                  Book This Package
                </Link>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
