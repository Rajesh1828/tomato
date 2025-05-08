const express = require('express');
const addFoodItem = require('../controllers/foodControler'); // assuming this file exists
const multer = require('multer');

const foodRouter = express.Router();

// Image upload storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the 'uploads' directory exists
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Use timestamp and original file name to avoid collisions
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Set up multer with storage options
const upload = multer({ storage: storage });

// Route to handle adding food item
foodRouter.post('/add', upload.single('image'), addFoodItem.addFoodItem);
foodRouter.get('/all', addFoodItem.getAllFoodItems);
foodRouter.delete('/remove/:id', addFoodItem.removeFoodItem); 

module.exports = { foodRouter };
