const Week = require("../models/Week");
const Subject = require("../models/Subject");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Format bytes into readable format
function formatSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// ─────────────────────────────────────────────
// @route   GET /api/subjects/:subjectId/weeks
// @desc    Get all weeks for a requested subject
// @access  Private
// ─────────────────────────────────────────────
exports.getWeeks = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const weeks = await Week.find({ subjectInfo: subjectId }).sort({ createdAt: 1 });
    res.status(200).json({ weeks });
  } catch (error) {
    console.error("Get Weeks Error:", error.message);
    res.status(500).json({ message: "Server error fetching weeks" });
  }
};

// ─────────────────────────────────────────────
// @route   POST /api/subjects/:subjectId/weeks
// @desc    Create a new week block
// @access  Private
// ─────────────────────────────────────────────
exports.createWeek = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { weekNumber, topicName } = req.body;

    const subject = await Subject.findOne({ _id: subjectId, user: req.user._id });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found or unauthorized" });
    }

    const week = await Week.create({
      subjectInfo: subjectId,
      weekNumber: weekNumber || "New Week",
      topicName: topicName || "",
      status: "IN PROGRESS",
      files: [],
    });

    res.status(201).json({ message: "Week basic created", week });
  } catch (error) {
    console.error("Create Week Error:", error.message);
    res.status(500).json({ message: "Server error creating week" });
  }
};

// ─────────────────────────────────────────────
// @route   PATCH /api/weeks/:weekId
// @desc    Update a week's status
// @access  Private
// ─────────────────────────────────────────────
exports.updateWeekStatus = async (req, res) => {
  try {
    const { weekId } = req.params;
    const { status } = req.body;
    
    // We ideally should verify user owns the subject of this week
    const week = await Week.findById(weekId).populate("subjectInfo");
    if (!week || week.subjectInfo.user.toString() !== req.user._id.toString()) {
       return res.status(404).json({ message: "Week not found or unauthorized" });
    }

    if (status) week.status = status;
    await week.save();
    
    res.status(200).json({ week });
  } catch(error) {
    res.status(500).json({ message: "Server error updating week" });
  }
};

// ─────────────────────────────────────────────
// @route   POST /api/weeks/:weekId/files
// @desc    Upload a single file to a week
// @access  Private
// ─────────────────────────────────────────────
exports.uploadFileToWeek = [
  upload.single("file"), // expecting key "file" in formData
  async (req, res) => {
    try {
      const { weekId } = req.params;
      
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const week = await Week.findById(weekId).populate("subjectInfo");
      if (!week || week.subjectInfo.user.toString() !== req.user._id.toString()) {
        fs.unlinkSync(req.file.path); // remove uploaded file if unauthorized
        return res.status(404).json({ message: "Week not found or unauthorized" });
      }

      const fileObj = {
        fileName: req.file.originalname,
        fileSize: formatSize(req.file.size),
        fileUrl: `/uploads/${req.file.filename}`, // accessible via static route
      };

      week.files.push(fileObj);
      await week.save();

      res.status(200).json({ message: "File uploaded successfully", file: fileObj, week });
    } catch (error) {
      console.error("Upload File Error:", error.message);
      res.status(500).json({ message: "Server error uploading file" });
    }
  }
];

// ─────────────────────────────────────────────
// @route   DELETE /api/weeks/:weekId/files/:fileId
// @desc    Delete a file from a week
// @access  Private
// ─────────────────────────────────────────────
exports.deleteFileFromWeek = async (req, res) => {
  try {
    const { weekId, fileId } = req.params;

    const week = await Week.findById(weekId).populate("subjectInfo");
    if (!week || week.subjectInfo.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Week not found or unauthorized" });
    }

    const fileObj = week.files.id(fileId);
    if (!fileObj) {
      return res.status(404).json({ message: "File not found" });
    }

    // Try to physically delete from uploads
    const filename = fileObj.fileUrl.split("/uploads/")[1];
    if (filename) {
      const physicalPath = path.join(__dirname, "..", "uploads", filename);
      if (fs.existsSync(physicalPath)) {
        fs.unlinkSync(physicalPath);
      }
    }

    week.files.pull(fileId);
    await week.save();

    res.status(200).json({ message: "File deleted successfully", week });
  } catch (error) {
    console.error("Delete File Error:", error.message);
    res.status(500).json({ message: "Server error deleting file" });
  }
};

// ─────────────────────────────────────────────
// @route   PATCH /api/weeks/:weekId/files/:fileId
// @desc    Rename a file
// @access  Private
// ─────────────────────────────────────────────
exports.renameFileInWeek = async (req, res) => {
  try {
    const { weekId, fileId } = req.params;
    const { newFileName } = req.body;

    if (!newFileName || newFileName.trim() === "") {
      return res.status(400).json({ message: "New file name is required" });
    }

    const week = await Week.findById(weekId).populate("subjectInfo");
    if (!week || week.subjectInfo.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Week not found or unauthorized" });
    }

    const fileObj = week.files.id(fileId);
    if (!fileObj) {
      return res.status(404).json({ message: "File not found" });
    }

    fileObj.fileName = newFileName;
    await week.save();

    res.status(200).json({ message: "File renamed successfully", week });
  } catch (error) {
    console.error("Rename File Error:", error.message);
    res.status(500).json({ message: "Server error renaming file" });
  }
};
