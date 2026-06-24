import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Dean from '../models/Dean.js';

export const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user =
      decoded.role === 'dean'
        ? await Dean.findById(decoded.id).lean()
        : await Student.findById(decoded.id).lean();

    if (!user) return next(new Error('User not found'));

    socket.user = user;
    next();
  } catch {
    next(new Error('Authentication failed'));
  }
};
