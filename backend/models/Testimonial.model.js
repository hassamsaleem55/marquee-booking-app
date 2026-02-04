import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

testimonialSchema.index({ isApproved: 1, isFeatured: 1, order: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
