const Order = require('../models/ordersModel');
const Cart = require('../models/cartModel');

const addOrder = async (req, res) => {
    const { shippingAddress, shippingPrice, paymentMethod, deliverydate } = req.body;
    const { user } = req;

    try {
        // Fetch the cart items for the user
        const cart = await Cart.findOne({ user: user._id }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Prepare order items from cart items
        const orderItems = cart.products.map(item => ({
            product: item.product._id,
            count: item.count,
            price: item.product.price // Assuming the product model has a price field
        }));

        // Calculate the total price
        let totalPrice = orderItems.reduce((total, item) => total + item.price * item.count, 0);
        totalPrice += shippingPrice;

        // Create the order
        await Order.create({
            user: user._id,
            orderItems,
            shippingAddress,
            shippingPrice,
            totalPrice,
            paymentMethod,
            deliverydate
        });

        // Clear the cart
        cart.products = [];
        await cart.save();

        res.status(201).json({ message: "Order added and cart cleared" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const getOrders = async (req, res) => {
    const { user } = req;

    try {
        const orders = await Order.find({ user: user._id })
            .populate('orderItems.product')
            .populate('shippingAddress')
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order


        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addOrder, getOrders };