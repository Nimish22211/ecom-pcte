import express from 'express';
import { getChatHistory, getConversations } from '../controllers/chatController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireVerified } from '../middleware/requireVerified.js';

const router = express.Router();

router.get('/conversations', authenticate, requireVerified, getConversations);
router.get('/:roomId', authenticate, requireVerified, getChatHistory);

export default router;
