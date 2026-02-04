import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';

const About = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await cmsAPI.getPage('about');
        setPage(response.data.page);
      } catch (error) {
        console.error('Error fetching page:', error);
      }
    };
    fetchPage();
  }, []);

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        {page ? (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {page.bannerImage && (
              <img
                src={`http://localhost:5000${page.bannerImage}`}
                alt={page.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600">
              Welcome to Marquee Booking, your premier destination for elegant events and unforgettable celebrations.
              We specialize in providing exceptional venues and services for weddings, corporate events, and special occasions.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To create memorable experiences by providing world-class venues, exceptional service, and attention to detail
              that makes every event special.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
