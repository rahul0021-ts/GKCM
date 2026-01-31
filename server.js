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

// ✅ CORS - allow both local dev and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",                  // local frontend
  "https://monumental-paprenjak-e31ab9.netlify.app"  // Netlify frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parser
app.use(express.json());

// ✅ Health check route (optional)
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

// Start server on Render or local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
