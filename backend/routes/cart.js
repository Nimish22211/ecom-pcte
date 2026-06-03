import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireVerified } from '../middleware/requireVerified.js';

const router = express.Router();

router.get('/', authenticate, requireVerified, getCart);
router.post('/:productId', authenticate, requireVerified, addToCart);
router.delete('/:productId', authenticate, requireVerified, removeFromCart);

export default router;
