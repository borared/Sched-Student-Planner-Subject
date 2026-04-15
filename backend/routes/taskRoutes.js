const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// All task routes are protected — user must be logged in

// GET  /api/tasks     — Get all tasks for the current user
// POST /api/tasks     — Create a new task
router.route("/").get(protect, getTasks).post(protect, createTask);

// PUT    /api/tasks/:id — Update a task
// DELETE /api/tasks/:id — Delete a task
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
