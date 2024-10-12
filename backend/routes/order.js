const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);


router.post('/add', orderController.addOrder);
router.get('/', orderController.getOrders);

module.exports = router;
