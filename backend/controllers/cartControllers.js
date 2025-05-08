const userModel = require('../models/userModel');

// Add item to cart
const AddToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if not exists

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; // Add item with quantity 1 if not already in cart
        } else {
            cartData[req.body.itemId] += 1; // Increment quantity if item is already in cart
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });

        res.status(200).json({ message: "Item added to cart", cartData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if not exists

        if (!cartData[req.body.itemId]) {
            return res.status(400).json({ message: "Item not found in cart" });
        }

        // Decrease the item quantity or remove it from the cart
        if (cartData[req.body.itemId] > 1) {
            cartData[req.body.itemId] -= 1;
        } else {
            delete cartData[req.body.itemId];
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });

        res.status(200).json({ message: "Item removed from cart", cartData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all items from the cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if not exists

        res.status(200).json({ cartData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { AddToCart, removeFromCart, getCart };
