// Load environment variables first, before anything else
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ─── Connect to MongoDB ───────────────────────
connectDB();

// ─── Initialize Express App ───────────────────
const app = express();

// ─── Global Middleware ────────────────────────

// Enable CORS so the frontend (on a different port/domain) can talk to this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─── API Routes ──────────────────────────────
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));

// ─── Health Check Route ───────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "📚 Study Planner API is running!" });
});

// ─── 404 Handler (unknown routes) ────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// ─── Start Server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
