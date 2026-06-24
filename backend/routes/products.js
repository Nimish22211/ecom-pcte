import express from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  markAsSold,
  markAsAvailable,
  deleteProduct,
  getMyListings,
  getMySoldItems,
} from '../controllers/productController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireVerified } from '../middleware/requireVerified.js';

const router = express.Router();

// Specific routes before :id to avoid conflicts
router.get('/my/listings', authenticate, requireVerified, getMyListings);
router.get('/my/sold', authenticate, requireVerified, getMySoldItems);

router.get('/', authenticate, requireVerified, getProducts);
router.post('/', authenticate, requireVerified, createProduct);
router.get('/:id', authenticate, requireVerified, getProductById);
router.patch('/:id/sold', authenticate, requireVerified, markAsSold);
router.patch('/:id/available', authenticate, requireVerified, markAsAvailable);
router.delete('/:id', authenticate, requireVerified, deleteProduct);

export default router;
