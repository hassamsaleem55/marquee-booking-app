import Page from '../models/Page.model.js';
import Gallery from '../models/Gallery.model.js';
import Package from '../models/Package.model.js';
import Service from '../models/Service.model.js';
import Testimonial from '../models/Testimonial.model.js';
import FAQ from '../models/FAQ.model.js';

// ============ PAGES ============
export const getPages = async (req, res, next) => {
  try {
    const pages = await Page.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, pages });
  } catch (error) {
    next(error);
  }
};

export const getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isPublished: true });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ success: true, page });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json({ success: true, page });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ success: true, page });
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    next(error);
  }
};

// ============ GALLERY ============
export const getGallery = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    
    const gallery = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, gallery });
  } catch (error) {
    next(error);
  }
};

export const getGalleryByCategory = async (req, res, next) => {
  try {
    const gallery = await Gallery.find({ category: req.params.category }).sort({ order: 1 });
    res.json({ success: true, gallery });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    next(error);
  }
};

// ============ PACKAGES ============
export const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ order: 1, price: 1 });
    res.json({ success: true, packages });
  } catch (error) {
    next(error);
  }
};

export const getPackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ success: true, package: packageItem });
  } catch (error) {
    next(error);
  }
};

export const createPackage = async (req, res, next) => {
  try {
    const packageItem = await Package.create(req.body);
    res.status(201).json({ success: true, package: packageItem });
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ success: true, package: packageItem });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findByIdAndDelete(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    next(error);
  }
};

// ============ SERVICES ============
export const getServices = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    
    const services = await Service.find(query).sort({ order: 1, category: 1 });
    res.json({ success: true, services });
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

// ============ TESTIMONIALS ============
export const getTestimonials = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const query = { isApproved: true };
    if (featured === 'true') query.isFeatured = true;
    
    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch (error) {
    next(error);
  }
};

export const getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

// ============ FAQs ============
export const getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;
    
    const faqs = await FAQ.find(query).sort({ order: 1, category: 1 });
    res.json({ success: true, faqs });
  } catch (error) {
    next(error);
  }
};

export const getFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ success: true, faq });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, faq });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ success: true, faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};
