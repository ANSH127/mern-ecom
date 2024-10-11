require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

app.listen(4000, () => console.log('Server running on http://localhost:4000/'));