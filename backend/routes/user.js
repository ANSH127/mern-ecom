const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/userController');

router.post('/signup', UserControllers.signupUser);
router.post('/login', UserControllers.loginUser);

module.exports = router;
