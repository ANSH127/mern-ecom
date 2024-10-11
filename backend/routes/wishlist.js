const express=require('express');
const router=express.Router();

const wishlistController=require('../controllers/wishlistController');
const requireAuth=require('../middleware/requireAuth');

router.use(requireAuth);

router.post('/add',wishlistController.addProductToWishlist);
router.delete('/remove',wishlistController.removeProductFromWishlist);
router.get('/',wishlistController.getWishlist);
router.post('/check',wishlistController.checkProductInWishlist);

module.exports=router;
