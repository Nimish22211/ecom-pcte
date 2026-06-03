import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailDomain: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  deanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dean', required: true, unique: true },
});

export default mongoose.model('College', collegeSchema);
