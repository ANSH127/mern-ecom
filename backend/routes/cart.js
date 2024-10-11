const express=require('express');
const router=express.Router();

const cartController=require('../controllers/cartController');
const requireAuth=require('../middleware/requireAuth');

router.use(requireAuth);

router.post('/add',cartController.addProductToCart);
router.delete('/remove',cartController.removeProductFromCart);
router.get('/',cartController.getCart);
router.post('/update',cartController.updateProductCount);
router.post('/check',cartController.IsProductInCart);

module.exports=router;