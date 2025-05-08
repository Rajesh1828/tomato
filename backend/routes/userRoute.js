
const express = require("express");
const userModel = require("../models/userModel");
const {Login,Register} = require("../controllers/userController")

const userRouter = express.Router();




userRouter.post("/login",Login);
userRouter.post("/register",Register);


module.exports = { userRouter };







