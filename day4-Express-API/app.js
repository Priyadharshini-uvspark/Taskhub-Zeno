
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

// Read JSON data from incoming requests
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Day 4 API is running" });
});

// Central error handler (keep this after routes)
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;
