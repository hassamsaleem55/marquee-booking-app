import { useEffect, useState } from 'react';
import { cmsAPI, uploadAPI } from '../../utils/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    category: 'wedding',
    isFeatured: false,
    order: 0
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await cmsAPI.getGallery();
      setGallery(response.data.gallery || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.uploadImage(file);
      setFormData({ ...formData, image: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await cmsAPI.updateGalleryItem(editingItem._id, formData);
      } else {
        await cmsAPI.createGalleryItem(formData);
      }
      fetchGallery();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Failed to save gallery item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      image: item.image,
      title: item.title,
      description: item.description,
      category: item.category,
      isFeatured: item.isFeatured,
      order: item.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await cmsAPI.deleteGalleryItem(id);
      fetchGallery();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const resetForm = () => {
    setFormData({
      image: '',
      title: '',
      description: '',
      category: 'wedding',
      isFeatured: false,
      order: 0
    });
    setEditingItem(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary">
          Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item._id} className="card">
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">{item.title || 'Untitled'}</h3>
            <p className="text-sm text-gray-600 mb-2 capitalize">{item.category}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="btn-primary text-xs px-3 py-1 flex-1">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn-danger text-xs px-3 py-1 flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Gallery Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="input-field"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                {formData.image && (
                  <img src={`http://localhost:5000${formData.image}`} alt="Preview" className="mt-4 h-32 object-cover rounded" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="decoration">Decoration</option>
                    <option value="food">Food</option>
                    <option value="stage">Stage</option>
                    <option value="venue">Venue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="mr-2"
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">Save</button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
