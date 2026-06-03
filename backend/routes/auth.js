import express from 'express';
import { deanLogin, studentRegister, studentLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/dean/login', deanLogin);
router.post('/student/register', studentRegister);
router.post('/student/login', studentLogin);

export default router;
