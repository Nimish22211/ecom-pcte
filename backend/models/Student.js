import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  status: { type: String, enum: ['unverified', 'verified'], default: 'unverified' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Student', studentSchema);
