import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireVerified } from '../middleware/requireVerified.js';

const router = express.Router();

router.get('/', authenticate, requireVerified, getWishlist);
router.post('/:productId', authenticate, requireVerified, addToWishlist);
router.delete('/:productId', authenticate, requireVerified, removeFromWishlist);

export default router;
