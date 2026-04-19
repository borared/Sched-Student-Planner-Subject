const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const CLIENT_URL = process.env.PROD_URL || process.env.FRONTEND_URL || "http://localhost:5176";

// ─────────────────────────────────────────────
// Email / Password Routes
// ─────────────────────────────────────────────

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me — protected
router.get("/me", protect, getMe);

// ─────────────────────────────────────────────
// Google OAuth Routes
// ─────────────────────────────────────────────

// Step 1: Redirect user to Google consent screen
// GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Handle Google callback after user approves
// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/auth?error=google_failed`,
    session: false, // We use JWT, not sessions
  }),
  (req, res) => {
    // User authenticated! Generate a JWT for the frontend
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    // Encode user info as a URL-safe string
    const userData = encodeURIComponent(
      JSON.stringify({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
      })
    );

    // Redirect back to frontend with token + user data in query params
    res.redirect(
      `${CLIENT_URL}/dashboard?token=${token}&user=${userData}`
    );
  }
);

module.exports = router;
