const express = require("express");
const router = express.Router();
const {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} = require("../controllers/subjectController");
const { protect } = require("../middleware/authMiddleware");

// All subject routes are protected — user must be logged in

// GET  /api/subjects     — Get all subjects for the current user
// POST /api/subjects     — Create a new subject
router.route("/").get(protect, getSubjects).post(protect, createSubject);

// DELETE /api/subjects/:id — Delete a subject
// PUT /api/subjects/:id — Update a subject
router.route("/:id").delete(protect, deleteSubject).put(protect, updateSubject);

module.exports = router;
