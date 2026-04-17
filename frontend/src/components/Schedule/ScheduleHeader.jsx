import { Bell } from "lucide-react";

/**
 * ScheduleHeader
 * Top bar: month/year title, prev/next/today navigation, search, bell, Add Task.
 */
export default function ScheduleHeader({ monthLabel, onPrev, onNext, onToday, onAddTask }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Month / Year */}
      <h1 className="text-3xl font-extrabold text-gray-900">{monthLabel}</h1>

      <div className="flex items-center gap-3">
        {/* Prev / Today / Next */}
        <div className="flex items-center gap-1 bg-white rounded-full border border-gray-200 px-1 py-1 shadow-sm">
          <button
            onClick={onPrev}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={onToday}
            className="px-4 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            Today
          </button>
          <button
            onClick={onNext}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            ›
          </button>
        </div>

        {/* Search */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        {/* Add Task */}
        <button 
          onClick={onAddTask}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  );
}
