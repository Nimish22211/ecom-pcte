import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { resolveRoom, isRoomParticipant } from '../utils/resolveRoom.js';

const chatHandler = (io, socket) => {
  socket.on('join_room', async ({ roomId }) => {
    const room = await resolveRoom(roomId);
    if (!room || !isRoomParticipant(room, socket.user)) {
      return socket.emit('error', { message: 'Not authorized to join this conversation' });
    }
    socket.join(roomId);
  });

  socket.on('leave_room', ({ roomId }) => {
    socket.leave(roomId);
  });

  socket.on('send_message', async ({ roomId, text }) => {
    if (!text?.trim()) return;

    try {
      const room = await resolveRoom(roomId);
      if (!room || !isRoomParticipant(room, socket.user)) {
        return socket.emit('error', { message: 'Not authorized to send to this conversation' });
      }

      const senderId = socket.user._id;
      const message = await Message.create({ roomId, senderId, text });

      await Conversation.findOneAndUpdate(
        { roomId },
        {
          roomId,
          participants: room.participantIds,
          lastMessage: text,
          lastMessageAt: message.createdAt,
        },
        { upsert: true }
      );

      io.to(roomId).emit('receive_message', {
        roomId,
        senderId,
        text,
        createdAt: message.createdAt,
      });

      // Update both participants' Chats list in real time, even if they don't
      // currently have this thread open.
      const [id1, id2] = room.participantIds;
      io.to(id1)
        .to(id2)
        .emit('conversation_updated', { roomId, lastMessage: text, lastMessageAt: message.createdAt });
    } catch {
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
};

export default chatHandler;
