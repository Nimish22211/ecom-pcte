import mongoose from 'mongoose';

const deanSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'dean' },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', default: null },
});

export default mongoose.model('Dean', deanSchema);
