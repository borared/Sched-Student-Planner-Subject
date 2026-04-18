import { Search, Bell } from "lucide-react";

/**
 * StudySetHeader
 * Top bar for the Study Sets page. Excludes the profile image per user request.
 */
export default function StudySetHeader() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight">Study Sets</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Organize your academic universe</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
          <Search size={20} strokeWidth={2.5} />
        </button>

        {/* Bell icon with notification dot */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </button>

        {/* Add Task button */}
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer ml-2">
          Add Task
        </button>
      </div>
    </header>
  );
}
