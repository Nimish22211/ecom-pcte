import Student from '../models/Student.js';

export const getUnverifiedStudents = async (req, res) => {
  try {
    const students = await Student.find({ collegeId: req.user.collegeId, status: 'unverified' }).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ collegeId: req.user.collegeId }).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, collegeId: req.user.collegeId },
      { status: 'verified' },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
