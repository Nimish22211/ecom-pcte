import admin from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import Dean from '../models/Dean.js';
import Student from '../models/Student.js';
import College from '../models/College.js';

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const deanLogin = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const dean = await Dean.findOne({ firebaseUID: decoded.uid });
    if (!dean) return res.status(403).json({ message: 'Not a dean account' });
    res.json({ token: signToken(dean._id, 'dean'), user: dean });
  } catch {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export const studentRegister = async (req, res) => {
  const { firebaseToken, name, rollNumber, collegeId } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const college = await College.findById(collegeId);
    if (!college) return res.status(400).json({ message: 'College not found' });

    const emailDomain = '@' + decoded.email.split('@')[1];
    if (emailDomain !== college.emailDomain) {
      return res.status(400).json({
        message: "Your email does not match the selected college's domain",
      });
    }

    const student = await Student.create({
      firebaseUID: decoded.uid,
      name,
      email: decoded.email,
      rollNumber,
      collegeId,
    });
    res.status(201).json({ message: 'Registration successful. Awaiting dean approval.', student });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email already registered' });
    res.status(400).json({ message: err.message });
  }
};

export const studentLogin = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const student = await Student.findOne({ firebaseUID: decoded.uid });
    if (!student) return res.status(404).json({ message: 'Student not registered' });
    res.json({ token: signToken(student._id, 'student'), user: student });
  } catch {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
