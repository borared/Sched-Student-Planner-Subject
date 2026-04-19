const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileSize: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const weekSchema = new mongoose.Schema(
  {
    subjectInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    weekNumber: {
      type: String,
      required: true,
    },
    topicName: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["IN PROGRESS", "COMPLETED", "NOT STARTED"],
      default: "IN PROGRESS",
    },
    files: [fileSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Week", weekSchema);
