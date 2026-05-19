// @ts-nocheck
import express from 'express';
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);

export default router;