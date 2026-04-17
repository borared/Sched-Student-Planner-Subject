import { Search, Bell } from "lucide-react";

/**
 * DashboardHeader
 * Top bar: greeting on the left, search/bell/add-task on the right
 */
export default function DashboardHeader({ name = "Bora", onAddTask }) {
  return (
    <header className="flex items-center justify-between mb-8">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-gray-900">Hello, {name}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Search size={20} />
        </button>

        {/* Bell icon with notification dot */}
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Add Task button */}
        <button 
          onClick={onAddTask}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
        >
          + Add Task
        </button>
      </div>
    </header>
  );
}
