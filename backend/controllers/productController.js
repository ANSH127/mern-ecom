const Product = require('../models/productModel');


const addProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock, imageUrl
            , category, hoverImageUrl
         } = req.body;
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            imageUrl,
            category,
            hoverImageUrl
        });
        await product.save();
        res.json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductsByCategory = async (req, res) => { 
    
    
    try {
        const products = await Product.find({ category: req.params.cname }).limit(10);
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory
}