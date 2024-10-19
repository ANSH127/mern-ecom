const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String, 
        required: true,
        enum: ['shirts', 'tshirts', 'jeans', 'trousers', 'shorts']
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },


});

module.exports = mongoose.model('Product', productSchema);