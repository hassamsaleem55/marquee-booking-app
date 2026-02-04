import { useEffect, useState } from 'react';
import { cmsAPI, uploadAPI } from '../../utils/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    image: '',
    isApproved: false,
    isFeatured: false,
    order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await cmsAPI.getTestimonials();
      setTestimonials(response.data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const response = await uploadAPI.uploadImage(file);
      setFormData({ ...formData, image: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await cmsAPI.updateTestimonial(editingTestimonial._id, formData);
      } else {
        await cmsAPI.createTestimonial(formData);
      }
      fetchTestimonials();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      email: testimonial.email,
      rating: testimonial.rating,
      message: testimonial.message,
      image: testimonial.image,
      isApproved: testimonial.isApproved,
      isFeatured: testimonial.isFeatured,
      order: testimonial.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await cmsAPI.deleteTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      rating: 5,
      message: '',
      image: '',
      isApproved: false,
      isFeatured: false,
      order: 0
    });
    setEditingTestimonial(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary">
          Add New Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="card">
            <div className="flex items-center mb-4">
              {testimonial.image && (
                <img src={`http://localhost:5000${testimonial.image}`} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3" />
              )}
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <div className="text-yellow-400">{'★'.repeat(testimonial.rating)}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-4 italic">"{testimonial.message}"</p>
            <div className="flex gap-2 mb-2">
              {testimonial.isApproved && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Approved</span>}
              {testimonial.isFeatured && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Featured</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(testimonial)} className="btn-primary text-xs px-3 py-1 flex-1">
                Edit
              </button>
              <button onClick={() => handleDelete(testimonial._id)} className="btn-danger text-xs px-3 py-1 flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="input-field"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="input-field"
                />
                {formData.image && (
                  <img src={`http://localhost:5000${formData.image}`} alt="Preview" className="mt-4 h-32 object-cover rounded" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isApproved}
                      onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                      className="mr-2"
                    />
                    Approved
                  </label>
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

export default Testimonials;
