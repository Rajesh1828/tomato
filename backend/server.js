const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { foodRouter } = require('./routes/foodRoute');
const { userRouter } = require('./routes/userRoute');
const { cartRouter } = require('./routes/cartRoute'); 
const { orderRoute } = require('./routes/orderRoute'); // Assuming you have an orderRoute defined





// app config
// Remove this duplicate
dotenv.config(); // ✅ Keep only one at the top

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

//Api end points


app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRoute); // Assuming you have an orderRoute defined

// routes
app.get("/", (req, res) => {
  res.send("API is working");
});

// server
app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
  
});
