import express from 'express';
import { createCollege, getAllColleges, getMyCollege } from '../controllers/collegeController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.get('/', getAllColleges);
router.post('/', authenticate, requireRole('dean'), createCollege);
router.get('/mine', authenticate, requireRole('dean'), getMyCollege);

export default router;
