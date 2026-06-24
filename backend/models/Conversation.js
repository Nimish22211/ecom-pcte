import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    // Always exactly the two people in this conversation — independent of
    // any product. See backend/utils/resolveRoom.js for how roomId is built.
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    ],
    lastMessage: { type: String, default: '' },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });

export default mongoose.model('Conversation', conversationSchema);
