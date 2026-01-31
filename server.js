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

// ✅ Allowed origins
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://spectacular-longma-a59748.netlify.app",
// ];

// ✅ CORS (NO wildcard, safe with credentials)
app.use(cors({
  origin: "https://spectacular-longma-a59748.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ✅ Preflight support
app.options("*", cors());

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
