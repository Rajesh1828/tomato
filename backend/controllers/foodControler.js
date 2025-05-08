const foodModel = require("../models/foodModel");
const fs = require("fs");
const path = require("path");

// Add food item
const addFoodItem = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        let image = req.file.filename;

        // Create new food item
        const newFood = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image,
            category: req.body.category
        });

        // Save to database
        await newFood.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: "Food item added successfully",
            data: newFood
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//all food items

const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await foodModel.find();    
        res.status(200).json({
            success: true,
            message: "Food items fetched successfully",
            data: foodItems
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false, 
            message: err.message
        });
    }
};


// Remove food item and image
const removeFoodItem = async (req, res) => {
    try {
        const { id } = req.params;  // Get the ID from the URL parameters

        // Find the food item
        const foodItem = await foodModel.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        // Construct the file path in a cross-platform way
        const imagePath = path.join(__dirname, '..', 'uploads', foodItem.image);

        // Check if the image file exists and remove it
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);  // Delete the image file
            console.log('Image deleted successfully');
        }

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Food item and image removed successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
};

// module.exports = { removeFoodItem };



module.exports = { addFoodItem, getAllFoodItems, removeFoodItem };
