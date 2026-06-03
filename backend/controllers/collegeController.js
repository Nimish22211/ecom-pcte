import College from '../models/College.js';
import Dean from '../models/Dean.js';

export const createCollege = async (req, res) => {
  try {
    if (req.user.collegeId) {
      return res.status(400).json({ message: 'You have already created a college' });
    }
    const { name, emailDomain, city } = req.body;
    const college = await College.create({ name, emailDomain, city, deanId: req.user._id });
    await Dean.findByIdAndUpdate(req.user._id, { collegeId: college._id });
    res.status(201).json(college);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email domain already registered' });
    res.status(400).json({ message: err.message });
  }
};

export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find({}, 'name emailDomain city');
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyCollege = async (req, res) => {
  try {
    const college = await College.findOne({ deanId: req.user._id });
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
