import React from "react";
import { Search, Bell, X } from "lucide-react";

/**
 * StudySetHeader
 * Top bar for the Study Sets page. Excludes the profile image per user request.
 */
export default function StudySetHeader({ searchQuery = "", onSearchChange = () => {} }) {
  return (
    <header className="flex items-center justify-between mb-10 h-16">
      <div>
        <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight whitespace-nowrap">Study Sets</h1>
        <p className="text-sm font-medium text-gray-500 mt-1 whitespace-nowrap">Organize your academic universe</p>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* Search Input Container */}
        <div className="flex items-center w-full max-w-sm lg:max-w-md bg-gray-100 rounded-full px-4">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent border-none outline-none px-3 py-2.5 text-gray-700 text-sm placeholder:text-gray-400"
          />
          <button
            onClick={() => onSearchChange("")}
            className={`p-1 shrink-0 cursor-pointer transition-all duration-150 ${
              searchQuery
                ? "text-gray-400 hover:text-gray-600 opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Bell icon with notification dot */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer shrink-0">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </button>

        {/* Add Task button */}
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer ml-2 shrink-0">
          Add Task
        </button>
      </div>
    </header>
  );
}
