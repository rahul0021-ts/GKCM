//import express from "express";//Imports Express to create the server and routes.
import dotenv from "dotenv";
import express from "express";//mports dotenv to load environment variables from .env file.
import cors from "cors";//Imports CORS middleware.Allows your frontend (React, for example) to make requests to this backend from a different origin.
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler, { notFound } from "./middleware/errorMiddleware.js"; // Imports custom error handling middleware:

dotenv.config();//Loads environment variables from .env into process.env.

// Connect to MongoDB
connectDB();//Calls the MongoDB connection function.

const app = express();//Initializes an Express app.

// Middleware
//app.use(cors());//Enables CORS so frontend apps can call your backend.
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://curious-twilight-df53a6.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());//Middleware to parse incoming JSON requests (req.body).

// Routes
app.use("/api/auth", authRoutes);///api/auth/register and /api/auth/login
app.use("/api/products", productRoutes);///api/products/ → GET, POST, PUT, DELETE

// 404 handler (should be after all routes)
app.use(notFound);

// Global error handler (should be last)
app.use(errorHandler);//Catches all errors thrown in controllers or middleware

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>//Starts the server
  console.log(`Server running on port ${PORT}`)
);
