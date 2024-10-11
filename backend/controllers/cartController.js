const Cart = require("../models/cartModel");

const addProductToCart = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const cart = await Cart.findOne({ user: user._id });

        if (cart) {
            const product = cart.products.find((product) => product.product.toString() === productId);

            if (product) {
                product.count += 1;
            } else {
                cart.products.push({ product: productId });
            }

            await cart.save();
        } else {
            await Cart.create({ user: user._id, products: [{ product: productId }] });
        }

        res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const removeProductFromCart = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;
    console.log(productId);
    

    try {
        const cart = await Cart.findOne({ user: user._id });

        if (cart) {
            cart.products = cart.products.filter((product) => product.product.toString() !== productId);
            await cart.save();
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Server error" });
    }
}


const getCart = async (req, res) => {
    const { user } = req;

    try {
        const cart = await Cart.findOne({ user: user._id }).populate("products.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const IsProductInCart = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const cart = await Cart.findOne({ user: user._id });

        if (cart) {
            const product = cart.products.find((product) => product.product.toString() === productId);

            if (product) {
                return res.status(200).json(true);
            }
        }

        res.status(200).json(false );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateProductCount = async (req, res) => {
    const { productId, count } = req.body;
    const { user } = req;

    try {
        const cart = await Cart.findOne({ user: user._id });

        if (cart) {
            const product = cart.products.find((product) => product.product.toString() === productId);

            if (product) {
                product.count = count;
                await cart.save();
            }
        }

        res.status(200).json({ message: "Product count updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = { addProductToCart, removeProductFromCart, getCart, IsProductInCart, updateProductCount };

