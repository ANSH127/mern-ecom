require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/user');
const wishlistRoutes = require('../routes/wishlist');
const cartRoutes = require('../routes/cart');
const addressRoutes = require('../routes/address');
const OrderRoutes = require('../routes/order');
const paymentRoutes = require('../routes/payment');

const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/payment', paymentRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

app.listen(4000, () => console.log('Server running on http://localhost:4000/'));

// export default app

