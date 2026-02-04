import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Page from '../models/Page.model.js';
import Package from '../models/Package.model.js';
import Service from '../models/Service.model.js';
import FAQ from '../models/FAQ.model.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marquee-booking');
    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@marquee.com' });
    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@marquee.com',
        password: 'admin123',
        role: 'super_admin'
      });
      console.log('✅ Admin user created (admin@marquee.com / admin123)');
    }

    // Create sample pages
    const pages = [
      {
        slug: 'about',
        title: 'About Us',
        content: '<p>Welcome to Marquee Booking, your premier destination for elegant events.</p>',
        isPublished: true
      },
      {
        slug: 'hall-details',
        title: 'Hall Details',
        content: '<p>Our elegant marquee hall features state-of-the-art facilities.</p>',
        isPublished: true
      }
    ];

    for (const page of pages) {
      await Page.findOneAndUpdate({ slug: page.slug }, page, { upsert: true });
    }
    console.log('✅ Sample pages created');

    // Create sample packages
    const packages = [
      {
        name: 'Basic Package',
        description: 'Perfect for small gatherings',
        price: 500,
        capacity: 50,
        features: ['Hall rental', 'Basic decoration', 'Sound system'],
        isActive: true
      },
      {
        name: 'Premium Package',
        description: 'Ideal for medium-sized events',
        price: 1000,
        capacity: 150,
        features: ['Hall rental', 'Premium decoration', 'Sound & lighting', 'Stage setup'],
        isActive: true
      },
      {
        name: 'Luxury Package',
        description: 'Ultimate experience for large celebrations',
        price: 2000,
        capacity: 300,
        features: ['Hall rental', 'Luxury decoration', 'Premium sound & lighting', 'Stage & backdrop', 'Bridal room'],
        isActive: true
      }
    ];

    for (const pkg of packages) {
      await Package.findOneAndUpdate({ name: pkg.name }, pkg, { upsert: true });
    }
    console.log('✅ Sample packages created');

    // Create sample services
    const services = [
      {
        name: 'Catering Service',
        description: 'Delicious meals for your event',
        price: 25,
        category: 'catering',
        isActive: true
      },
      {
        name: 'Photography',
        description: 'Professional event photography',
        price: 500,
        category: 'photography',
        isActive: true
      },
      {
        name: 'Floral Decoration',
        description: 'Beautiful floral arrangements',
        price: 300,
        category: 'decoration',
        isActive: true
      }
    ];

    for (const service of services) {
      await Service.findOneAndUpdate({ name: service.name }, service, { upsert: true });
    }
    console.log('✅ Sample services created');

    // Create sample FAQs
    const faqs = [
      {
        question: 'How do I book an event?',
        answer: 'You can book through our website by filling out the booking form or contact us directly.',
        category: 'booking',
        isActive: true
      },
      {
        question: 'What is included in the package?',
        answer: 'Each package includes different amenities. Please check the package details for specific features.',
        category: 'pricing',
        isActive: true
      },
      {
        question: 'Can I customize my event?',
        answer: 'Yes, we offer customization options. Please contact us to discuss your requirements.',
        category: 'services',
        isActive: true
      }
    ];

    for (const faq of faqs) {
      await FAQ.findOneAndUpdate({ question: faq.question }, faq, { upsert: true });
    }
    console.log('✅ Sample FAQs created');

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
