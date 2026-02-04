import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';

const HallDetails = () => {
  const [page, setPage] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, galleryRes] = await Promise.all([
          cmsAPI.getPage('hall-details').catch(() => null),
          cmsAPI.getGallery({ category: 'venue' })
        ]);
        if (pageRes) setPage(pageRes.data.page);
        setGallery(galleryRes.data.gallery || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Hall Details</h1>

        {page ? (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            {page.bannerImage && (
              <img
                src={`http://localhost:5000${page.bannerImage}`}
                alt={page.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Venue</h2>
            <p className="text-gray-600 mb-4">
              Our elegant marquee hall features state-of-the-art facilities and can accommodate events of various sizes.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Spacious main hall with capacity up to 500 guests</li>
              <li>Modern sound and lighting systems</li>
              <li>Climate-controlled environment</li>
              <li>Premium stage setup</li>
              <li>Parking facilities</li>
              <li>Dedicated bridal/groom rooms</li>
            </ul>
          </div>
        )}

        {gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Venue Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item._id} className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title || 'Venue'}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallDetails;
