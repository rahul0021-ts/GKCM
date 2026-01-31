import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler, { notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS - allow both localhost and Netlify frontend
const allowedOrigins = [
  "http://localhost:5173",                  // local frontend
  "https://monumental-paprenjak-e31ab9.netlify.app"  // Netlify frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,       // if you want to allow cookies
  preflightContinue: false // handle OPTIONS preflight automatically
}));

// Handle OPTIONS preflight for all routes
app.options("*", cors());

// Body parser
app.use(express.json());

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
