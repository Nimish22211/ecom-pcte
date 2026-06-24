import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { resolveRoom, isRoomParticipant } from '../utils/resolveRoom.js';

export const getChatHistory = async (req, res) => {
  try {
    const room = await resolveRoom(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Conversation not found' });
    if (!isRoomParticipant(room, req.user)) {
      return res.status(403).json({ message: 'Not authorized to view this conversation' });
    }

    const messages = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({ participants: userId })
      .sort({ lastMessageAt: -1 })
      .populate('participants', 'name');

    const result = conversations.map((c) => {
      const otherUser = c.participants.find((p) => String(p._id) !== String(userId));
      return {
        roomId: c.roomId,
        otherUser: otherUser ? { _id: otherUser._id, name: otherUser.name } : null,
        lastMessage: c.lastMessage,
        lastMessageAt: c.lastMessageAt,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
