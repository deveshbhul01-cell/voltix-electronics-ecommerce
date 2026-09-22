import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

await connectDB();

const app = express();

/* =========================
   MIDDLEWARE
   ========================= */

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  express.json({
    limit: "1mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

/* =========================
   BASIC ROUTES
   ========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DEVSTORE API is running ⚡"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "DEVSTORE API",
    status: "healthy"
  });
});

/* =========================
   API ROUTES
   ========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

/* =========================
   404 HANDLER
   ========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

/* =========================
   GLOBAL ERROR HANDLER
   ========================= */

app.use((error, req, res, next) => {
  console.error(error);

  res.status(
    error.status || 500
  ).json({
    success: false,
    message:
      error.message ||
      "Internal server error."
  });
});

/* =========================
   START SERVER
   ========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `🚀 DEVSTORE API running on port ${PORT}`
    );
  }
);
