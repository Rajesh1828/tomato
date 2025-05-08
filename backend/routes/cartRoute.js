const express = require("express");
const userCart = require("../controllers/cartControllers");
const {authMiddleware}= require("../middleware/auth"); // Assuming you have an auth middleware

const cartRouter = express.Router();




cartRouter.post("/add",authMiddleware,  userCart.AddToCart);
cartRouter.post("/remove/", authMiddleware,  userCart.removeFromCart);
cartRouter.post("/get", authMiddleware,  userCart.getCart)


module.exports = {cartRouter};
