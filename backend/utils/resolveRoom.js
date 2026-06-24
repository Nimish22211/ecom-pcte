import mongoose from 'mongoose';
import Student from '../models/Student.js';

// A roomId identifies exactly one pair of people, regardless of which
// product brought them together or who is buying/selling. It's always
// `${idA}_${idB}` with the two ObjectIds sorted lexicographically, so the
// same two people always produce the same roomId no matter who initiates.
export const buildRoomId = (userId1, userId2) =>
  [String(userId1), String(userId2)].sort().join('_');

export const resolveRoom = async (roomId) => {
  if (typeof roomId !== 'string') return null;
  const parts = roomId.split('_');
  if (parts.length !== 2) return null;

  const [id1, id2] = parts;
  if (!mongoose.isValidObjectId(id1) || !mongoose.isValidObjectId(id2)) return null;

  const [user1, user2] = await Promise.all([
    Student.findById(id1).select('name collegeId').lean(),
    Student.findById(id2).select('name collegeId').lean(),
  ]);
  if (!user1 || !user2) return null;

  return { participantIds: [id1, id2], users: [user1, user2] };
};

// Requester must be one of the two people in the room, and both people must
// belong to the same college (mirrors the college-isolation rule enforced
// everywhere else in the marketplace).
export const isRoomParticipant = (room, user) => {
  const uid = String(user._id);
  if (!room.participantIds.includes(uid)) return false;

  const [u1, u2] = room.users;
  return String(u1.collegeId) === String(u2.collegeId);
};
