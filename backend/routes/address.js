const express=require('express');
const router=express.Router();

const addressController=require('../controllers/addressController');
const requireAuth=require('../middleware/requireAuth');

router.use(requireAuth);

router.post('/add',addressController.addAddress);
router.get('/',addressController.getAddresses);
router.delete('/:id',addressController.deleteAddress);

module.exports=router;
