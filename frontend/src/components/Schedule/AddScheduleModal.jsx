import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

/**
 * AddScheduleModal
 * A modal to create a new task/schedule for the calendar.
 */
export default function AddScheduleModal({ isOpen, onClose, onSave }) {
  const [taskName, setTaskName] = useState("");
  const [subject, setSubject] = useState("Neurobiology");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");

  // Clear form when opened
  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setSubject("Neurobiology");
      setDate("");
      setStartTime("");
      setEndTime("");
      setPriority("Medium");
      setNotes("");
    }
  }, [isOpen]);

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
    if (!taskName || !date) return; // Simple validation

    onSave({
      taskName,
      subject,
      date,
      startTime,
      endTime,
      priority,
      notes,
    });
    onClose();
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Modal Card ── */}
      <div
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2
          transition-all duration-300 ease-out w-[560px] max-w-[95vw] shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-[#1a1d27]
          ${isOpen ? "-translate-y-1/2 opacity-100 scale-100" : "-translate-y-[48%] opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Create New Task</h2>
            <p className="text-sm text-gray-400">Define your focus for the upcoming session.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Task Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Task Name
              </label>
              <input
                type="text"
                placeholder="e.g., Cellular Metabolism Review"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800"
              />
            </div>

            <div className="flex gap-4">
              {/* Subject */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 cursor-pointer"
                  >
                    <option>Neurobiology</option>
                    <option>Organic Chemistry</option>
                    <option>Computer Science</option>
                    <option>Philosophy</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 pl-4 pr-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 calendar-no-icon"
                  />
                  <CalendarIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Time Slot */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Time Slot
              </label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 time-no-icon"
                  />
                  <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 time-no-icon"
                  />
                  <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Priority Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Priority Level
              </label>
              <div className="flex gap-3 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPriority(level)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${
                      priority === level
                        ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Description */}
            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Notes / Description
              </label>
              <textarea
                rows={3}
                placeholder="Write down key objectives or materials needed..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all"
              >
                Schedule Task
              </button>
            </div>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-no-icon::-webkit-calendar-picker-indicator,
        .time-no-icon::-webkit-calendar-picker-indicator {
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
