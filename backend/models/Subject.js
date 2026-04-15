const mongoose = require("mongoose");

/**
 * Subject Schema
 * Represents a study subject/course belonging to a user.
 */
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    color: {
      type: String,
      default: "#4f46e5", // Default indigo color
      trim: true,
    },
    // Reference to the user who owns this subject
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
