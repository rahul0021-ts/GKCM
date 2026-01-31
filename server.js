import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler, { notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// ✅ CORS
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://curious-twilight-df53a6.netlify.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 REQUIRED

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
