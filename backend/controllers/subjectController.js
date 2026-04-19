const Subject = require("../models/Subject");
const Task = require("../models/Task");

// ─────────────────────────────────────────────
// @route   GET /api/subjects
// @desc    Get all subjects for the logged-in user
// @access  Private
// ─────────────────────────────────────────────
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ count: subjects.length, subjects });
  } catch (error) {
    console.error("Get Subjects Error:", error.message);
    res.status(500).json({ message: "Server error fetching subjects" });
  }
};

// ─────────────────────────────────────────────
// @route   POST /api/subjects
// @desc    Create a new subject
// @access  Private
// ─────────────────────────────────────────────
const createSubject = async (req, res) => {
  try {
    const { name, description, color, midTermDate, finalExamDate } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const subject = await Subject.create({
      name,
      description: description || "",
      midTermDate: midTermDate || null,
      finalExamDate: finalExamDate || null,
      color: color || "#4f46e5", // Default color if not provided
      user: req.user._id,
    });

    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    console.error("Create Subject Error:", error.message);
    res.status(500).json({ message: "Server error creating subject" });
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /api/subjects/:id
// @desc    Delete a subject (and unlink its tasks)
// @access  Private
// ─────────────────────────────────────────────
const deleteSubject = async (req, res) => {
  try {
    // Find the subject and ensure it belongs to the current user
    const subject = await Subject.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Unlink this subject from any tasks that referenced it
    await Task.updateMany(
      { subject: subject._id },
      { $set: { subject: null } }
    );

    await subject.deleteOne();

    res.status(200).json({
      message: "Subject deleted successfully and unlinked from related tasks",
    });
  } catch (error) {
    console.error("Delete Subject Error:", error.message);
    res.status(500).json({ message: "Server error deleting subject" });
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/subjects/:id
// @desc    Update a subject
// @access  Private
// ─────────────────────────────────────────────
const updateSubject = async (req, res) => {
  try {
    const { name, description, color, midTermDate, finalExamDate } = req.body;

    const subject = await Subject.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    if (name) subject.name = name;
    if (description !== undefined) subject.description = description;
    if (color) subject.color = color;
    if (midTermDate !== undefined) subject.midTermDate = midTermDate;
    if (finalExamDate !== undefined) subject.finalExamDate = finalExamDate;

    await subject.save();

    res.status(200).json({ message: "Subject updated successfully", subject });
  } catch (error) {
    console.error("Update Subject Error:", error.message);
    res.status(500).json({ message: "Server error updating subject" });
  }
};

module.exports = { getSubjects, createSubject, deleteSubject, updateSubject };
