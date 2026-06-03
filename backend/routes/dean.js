import express from 'express';
import {
  getUnverifiedStudents,
  getAllStudents,
  verifyStudent,
} from '../controllers/deanController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.get('/students/unverified', authenticate, requireRole('dean'), getUnverifiedStudents);
router.get('/students/all', authenticate, requireRole('dean'), getAllStudents);
router.patch('/students/:id/verify', authenticate, requireRole('dean'), verifyStudent);

export default router;
