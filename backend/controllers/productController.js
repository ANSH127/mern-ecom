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
        const usersearch = req.params.cname;
        const categorylist = await Product.find().distinct('category');
        const searchWords = usersearch.split(" ");
        for (let i = 0; i < searchWords.length; i++) {
            searchWords[i] = searchWords[i].toLowerCase();
        }
        const matchedCategory = searchWords.find(word => categorylist.includes(word));
        if (matchedCategory) {
            const products = await Product.find({ category: matchedCategory });
            res.json(products);
        }
        else {
            res.json([]);
        }
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