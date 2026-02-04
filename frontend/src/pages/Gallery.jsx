import { useEffect, useState } from 'react';
import { cmsAPI } from '../utils/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const response = await cmsAPI.getGallery(params);
        setGallery(response.data.gallery || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  const categories = ['all', 'wedding', 'decoration', 'food', 'stage', 'venue'];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item._id} className="relative overflow-hidden rounded-lg aspect-square group">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title || 'Gallery'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {item.title && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No images found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
