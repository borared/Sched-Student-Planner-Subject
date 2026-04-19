// Load environment variables first, before anything else
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");

// ─── Connect to MongoDB ───────────────────────
connectDB();

// ─── Initialize Passport Strategy ────────────
require("./config/passport")(passport);

// ─── Initialize Express App ───────────────────
const app = express();

// ─── Global Middleware ────────────────────────

// CORS — allow any localhost port in development (Vite changes ports dynamically)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps) or any localhost port
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || origin.includes("vercel.app")) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session — required by Passport even when using JWT (for the OAuth redirect flow)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "sched_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true in production with HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ─── API Routes ──────────────────────────────

// Auth routes handle BOTH /api/auth/* and /auth/google (OAuth)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // Email/password: /api/auth/register, /api/auth/login
app.use("/auth", authRoutes);    // Google OAuth:   /auth/google, /auth/google/callback

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api", require("./routes/weekRoutes")); // week paths defined individually

// ─── Serve Uploads Statically ─────────────────
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Health Check Route ───────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "📚 Study Planner API is running!" });
});

// ─── 404 Handler ─────────────────────────────
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
