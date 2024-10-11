const Wishlist = require('../models/wishlistModel');

const addProductToWishlist = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const wishlist = await Wishlist.findOne({ user: user._id });

        if (wishlist) {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: 'Product already in wishlist' });
            }

            wishlist.products.push(productId);
            await wishlist.save();
        } else {
            await Wishlist.create({ user: user._id, products: [productId] });
        }

        res.status(201).json({ message: 'Product added to wishlist' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error' });
    }
}

const removeProductFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const { user } = req;

    try {
        const wishlist = await Wishlist.findOne({ user: user._id });

        if (wishlist) {
            wishlist.products = wishlist.products.filter((product) => product.toString() !== productId);
            await wishlist.save();
        }

        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getWishlist = async (req, res) => {
    const { user } = req;

    try {
        const wishlist = await Wishlist.findOne({ user: user._id }).populate('products');

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const checkProductInWishlist = async (req, res) => {
    const {productId}=req.body;
    // console.log(productId);
    
    const {user}=req;
    try{
        const wishlist=await Wishlist.findOne({user:user._id});
        if(wishlist){
            if(wishlist.products.includes(productId)){
                return res.status(200).json(true);
            }
        }
        res.status(200).json(false);
    }
    catch(error){
        res.status(500).json({message:'Server error'});
    }
}



module.exports = { addProductToWishlist, removeProductFromWishlist, getWishlist,checkProductInWishlist };