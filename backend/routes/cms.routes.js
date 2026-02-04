import express from 'express';
import {
  // Pages
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  // Gallery
  getGallery,
  getGalleryByCategory,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  // Packages
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  // Services
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  // Testimonials
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  // FAQs
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/cms.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes (read-only)
router.get('/pages', getPages);
router.get('/pages/:slug', getPage);
router.get('/gallery', getGallery);
router.get('/gallery/category/:category', getGalleryByCategory);
router.get('/packages', getPackages);
router.get('/packages/:id', getPackage);
router.get('/services', getServices);
router.get('/services/:id', getService);
router.get('/testimonials', getTestimonials);
router.get('/testimonials/:id', getTestimonial);
router.get('/faqs', getFAQs);
router.get('/faqs/:id', getFAQ);

// Admin routes (protected)
const adminOnly = [authenticate, authorize('super_admin', 'manager')];

// Pages
router.post('/pages', ...adminOnly, createPage);
router.put('/pages/:id', ...adminOnly, updatePage);
router.delete('/pages/:id', ...adminOnly, deletePage);

// Gallery
router.post('/gallery', ...adminOnly, createGalleryItem);
router.put('/gallery/:id', ...adminOnly, updateGalleryItem);
router.delete('/gallery/:id', ...adminOnly, deleteGalleryItem);

// Packages
router.post('/packages', ...adminOnly, createPackage);
router.put('/packages/:id', ...adminOnly, updatePackage);
router.delete('/packages/:id', ...adminOnly, deletePackage);

// Services
router.post('/services', ...adminOnly, createService);
router.put('/services/:id', ...adminOnly, updateService);
router.delete('/services/:id', ...adminOnly, deleteService);

// Testimonials
router.post('/testimonials', ...adminOnly, createTestimonial);
router.put('/testimonials/:id', ...adminOnly, updateTestimonial);
router.delete('/testimonials/:id', ...adminOnly, deleteTestimonial);

// FAQs
router.post('/faqs', ...adminOnly, createFAQ);
router.put('/faqs/:id', ...adminOnly, updateFAQ);
router.delete('/faqs/:id', ...adminOnly, deleteFAQ);

export default router;
