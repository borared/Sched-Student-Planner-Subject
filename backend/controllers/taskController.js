const Task = require("../models/Task");

// ─────────────────────────────────────────────
// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
// ─────────────────────────────────────────────
const getTasks = async (req, res) => {
  try {
    // Fetch tasks belonging to the authenticated user
    // Populate subject name and color for convenience
    const tasks = await Task.find({ user: req.user._id })
      .populate("subject", "name color")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    console.error("Get Tasks Error:", error.message);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// ─────────────────────────────────────────────
// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
// ─────────────────────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, subject, deadline } = req.body;

    // Validate required field
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      subject: subject || null,
      deadline: deadline || null,
      user: req.user._id, // Associate task with the logged-in user
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ message: "Server error creating task" });
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/tasks/:id
// @desc    Update a task (title, description, deadline, completed, subject)
// @access  Private
// ─────────────────────────────────────────────
const updateTask = async (req, res) => {
  try {
    // Find the task and ensure it belongs to the current user
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, subject, deadline, completed } = req.body;

    // Update only provided fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (subject !== undefined) task.subject = subject;
    if (deadline !== undefined) task.deadline = deadline;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ message: "Server error updating task" });
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
// ─────────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    // Find the task and ensure it belongs to the current user
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ message: "Server error deleting task" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
