const express = require("express");
const {placeOrder} = require("../controllers/orderControllers");
const {authMiddleware}= require("../middleware/auth"); // Assuming you have an auth middleware




const orderRoute = express.Router();




orderRoute.post("/placeOrder",authMiddleware, placeOrder);




module.exports = {orderRoute};