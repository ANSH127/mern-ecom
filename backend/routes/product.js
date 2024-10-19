const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.post('/add', productController.addProduct);

router.get('/all', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.get('/category/:cname', productController.getProductsByCategory);

module.exports = router;