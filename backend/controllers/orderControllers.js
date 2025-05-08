const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const Stripe = require('stripe')




 const placeOrder = async (req, res) => {

    try {
        const { items, amount, address } = req.body;
        const userId = req.user._id; // Assuming you have user ID from auth middleware

        // Create a new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            status: 'processing',
        });

        // Save the order to the database
        await newOrder.save();
        // Update the user's order history
        // Assuming you have an orders array in your user model to keep track of orders

        await userModel.findByIdAndUpdate(req.body.userId, { $push: { orders: newOrder._id } });
        // Initialize Stripe with your secret key
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // Create a payment intent with the order amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });
    


        // Send a response back to the client
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

 }





 module.exports = {
    placeOrder
 }

