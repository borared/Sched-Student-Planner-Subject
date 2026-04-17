import { useState } from "react";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";

const UPCOMING_TASKS = [
  { title: "Organic Chemistry Quiz", time: "09:00 AM", location: "Room 402" },
  { title: "Thesis Review Session", time: "02:30 PM", location: "Remote" },
  { title: "Library Study Group", time: "06:00 PM", location: "Main Lib" },
];

/**
 * UpcomingPanel
 * Shows today's upcoming tasks and a tip of the day card.
 */
export default function UpcomingPanel() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 min-w-[240px] max-w-[260px] flex flex-col gap-4 z-100">
      {/* Header */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900">Upcoming</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
          3 Tasks Today
        </span>
      </div>

      {/* Expandable Content Container */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden flex flex-col gap-4">

      {/* Task list */}
      <ul className="flex flex-col gap-3">
        {UPCOMING_TASKS.map((task, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-snug">{task.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {task.time} — {task.location}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Tip of the day */}
      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
          <MapPin size={14} className="text-blue-500" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
            Tip of the day
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Try the Pomodoro technique for the Chemistry quiz study.
          </p>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
