const mongoose = require("mongoose");

/**
 * Task Schema
 * Represents a study task/assignment belonging to a user,
 * optionally linked to a Subject.
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    // Optional reference to a Subject
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
    },
    deadline: {
      type: Date,
      default: null,
    },
    // Whether the task has been completed
    completed: {
      type: Boolean,
      default: false,
    },
    // Reference to the user who owns this task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
