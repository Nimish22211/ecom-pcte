import Message from '../models/Message.js';

const chatHandler = (io, socket) => {
  socket.on('join_room', ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on('send_message', async ({ roomId, senderId, text }) => {
    try {
      const message = await Message.create({ roomId, senderId, text });
      io.to(roomId).emit('receive_message', {
        senderId,
        text,
        createdAt: message.createdAt,
      });
    } catch {
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
};

export default chatHandler;
