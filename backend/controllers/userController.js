const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    signupUser,
    loginUser
}