const Address = require('../models/addressModel');


const addAddress = async (req, res) => {
    const { fullName, address, city, postalCode, state, phoneNumber } = req.body;
    const { user } = req;

    try {
        await Address.create({ user: user._id, fullName, address, city, postalCode, state, phoneNumber });

        res.status(201).json({ message: "Address added" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAddresses = async (req, res) => {
    const { user } = req;

    try {
        const addresses = await Address.find({ user: user._id });

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addAddress, getAddresses };

