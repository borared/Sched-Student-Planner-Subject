import { Bell } from "lucide-react";

/**
 * SettingsHeader
 * Top bar with page title, search, notifications, and Add Task button.
 */
export default function SettingsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        {/* Bell */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500">
          <Bell size={18} />
        </button>
        {/* Add Task */}
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
          <span className="text-base leading-none">+</span> Add Task
        </button>
      </div>
    </div>
  );
}
