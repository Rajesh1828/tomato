const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validator = require('validator');

// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login User
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await user.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const token = createToken(userExist._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            userExist
         
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Register User
const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Check if user already exists
        const userExist = await user.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        // Create token
        const token = createToken(newUser._id);

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }

        console.log("Token:", token);

        res.status(200).json({ success: true, message: "User created successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
};

module.exports = { Register, Login };
