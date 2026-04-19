import { useState, useEffect } from "react";
import { BookOpen, AlignLeft, Calendar as CalendarIcon } from "lucide-react";

/**
 * AddSubjectModal
 * Modal to create a new Subject (Study Set).
 */
export default function AddSubjectModal({ isOpen, onClose, onSave, subjectToEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [midTermDate, setMidTermDate] = useState("");
  const [finalExamDate, setFinalExamDate] = useState("");
  const [color, setColor] = useState("#4f46e5");

  // Populate data when opened
  useEffect(() => {
    if (isOpen) {
      if (subjectToEdit) {
        setName(subjectToEdit.name || "");
        setDescription(subjectToEdit.description || "");
        setMidTermDate(subjectToEdit.midTermDate ? new Date(subjectToEdit.midTermDate).toISOString().split('T')[0] : "");
        setFinalExamDate(subjectToEdit.finalExamDate ? new Date(subjectToEdit.finalExamDate).toISOString().split('T')[0] : "");
        setColor(subjectToEdit.color || "#4f46e5");
      } else {
        setName("");
        setDescription("");
        setMidTermDate("");
        setFinalExamDate("");
        setColor("#4f46e5");
      }
    }
  }, [isOpen, subjectToEdit]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onSave({
      name,
      description,
      midTermDate,
      finalExamDate,
      color,
    });
  };

  const presetColors = [
    "#4f46e5", // Indigo
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#f43f5e", // Rose
    "#f97316", // Orange
    "#10b981", // Emerald
    "#14b8a6", // Teal
  ];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Modal Card ── */}
      <div
        className={`fixed z-[70] left-1/2 top-1/2 -translate-x-1/2
          transition-all duration-300 ease-out w-[560px] max-w-[95vw] shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-[#1a1d27]
          ${isOpen ? "-translate-y-1/2 opacity-100 scale-100" : "-translate-y-[48%] opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {subjectToEdit ? "Edit Subject" : "Create New Subject"}
            </h2>
            <p className="text-sm text-gray-400">
              {subjectToEdit ? "Update your subject details and settings." : "Define a new study area to organize your academic life."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Subject Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Cellular Biology"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800"
                />
                <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Description
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Genetic sequencing and cell signaling..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 resize-none"
                />
                <AlignLeft size={16} className="absolute left-3 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Dates: Mid Term and Final Exam */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Mid Term Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={midTermDate}
                    onChange={(e) => setMidTermDate(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 calendar-no-icon"
                  />
                  <CalendarIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Final Exam Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={finalExamDate}
                    onChange={(e) => setFinalExamDate(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 calendar-no-icon"
                  />
                  <CalendarIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Theme Color */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Theme Color
              </label>
              <div className="flex flex-wrap gap-3">
                {presetColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      color === c ? "border-gray-800 scale-110" : "border-transparent hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                {subjectToEdit ? "Update Subject" : "Add Subject"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-no-icon::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
          position: absolute;
          right: 0;
          width: 2rem;
          height: 100%;
        }
      `}} />
    </>
  );
}
