const express = require("express");
const router = express.Router({ mergeParams: true }); // Important to access :subjectId from parent router if mounted that way, or we can just use normal routes
const { getWeeks, createWeek, uploadFileToWeek, updateWeekStatus, deleteFileFromWeek, renameFileInWeek } = require("../controllers/weekController");
const { protect } = require("../middleware/authMiddleware");

// We'll define paths starting with /api/weeks and /api/subjects route mounting
// Alternatively, we define everything here starting with /api/subjects/:subjectId/weeks

router.get("/subjects/:subjectId/weeks", protect, getWeeks);
router.post("/subjects/:subjectId/weeks", protect, createWeek);

// For updating a week (e.g. status)
router.patch("/weeks/:weekId", protect, updateWeekStatus);

// For files we use multer middleware which is defined in the controller for cleanliness
router.post("/weeks/:weekId/files", protect, uploadFileToWeek);
router.delete("/weeks/:weekId/files/:fileId", protect, deleteFileFromWeek);
router.patch("/weeks/:weekId/files/:fileId", protect, renameFileInWeek);

module.exports = router;
