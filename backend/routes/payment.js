const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const crypto = require('crypto');
const Cart = require('../models/cartModel');
const requireAuth = require('../middleware/requireAuth');

require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.use(requireAuth);

router.post('/order', async (req, res) => {

  const user = req.user;


  // fetch total amount from cart

  const cart = await Cart.findOne({ user: user._id }).populate('products.product');

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const orderItems = cart.products.map(item => ({
    product: item.product._id,
    count: item.count,
    price: item.product.price // Assuming the product model has a price field
  }));
  let amount = orderItems.reduce((total, item) => total + item.price * item.count, 0);
  amount = amount * 100; // converting to smallest currency unit
  amount+=100*100; // adding shipping charges




  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  // console.log(req.body);


  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.json({ status: 'failure' });
  }
});




module.exports = router;