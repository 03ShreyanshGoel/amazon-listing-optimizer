import express from 'express';
import { optimizeProduct, getProductHistory, getAllHistory } from '../controllers/productController.js';

const router = express.Router();

router.post('/optimize', optimizeProduct);
router.get('/history/:asin', getProductHistory);
router.get('/history', getAllHistory);

export default router;