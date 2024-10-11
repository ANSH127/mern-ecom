const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


userSchema.statics.signup = async function (username, email, password) {

    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }


    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }

    const existingUser = await this.findOne({ email });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    const salt= await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user=await this.create({username,email,password:encryptedPassword});
    return user;
}

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw new Error('All fields are required');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    return user;

}



module.exports = mongoose.model('User', userSchema);