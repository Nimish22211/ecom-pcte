import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Books', 'Electronics', 'Notes', 'Stationery', 'Hostel', 'Other'],
    required: true,
  },
  images: [String],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
