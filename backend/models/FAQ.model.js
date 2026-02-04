import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true
  },
  category: {
    type: String,
    default: 'general',
    enum: ['general', 'booking', 'pricing', 'services', 'venue']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

faqSchema.index({ category: 1, isActive: 1, order: 1 });

export default mongoose.model('FAQ', faqSchema);
