import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Schedule", icon: CalendarDays },
  { label: "Study Sets", icon: BookOpen },
  { label: "Analytics", icon: BarChart2 },
  { label: "Settings", icon: Settings },
];

export default function SideBar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-60 h-screen bg-white flex flex-col px-4 py-6 shrink-0">

      {/* ── Brand ── */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-900 leading-none">Sched</h1>
        <p className="text-xs text-gray-400 mt-0.5">Focus Mode</p>
      </div>

      {/* ── Nav Links ── */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left
                ${
                  isActive
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-blue-600" : "text-gray-400"}
              />
              {label}
            </button>
          );
        })}
      </nav>

      {/* ── Bottom Section ── */}
      <div className="flex flex-col gap-4">
        {/* New Session Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
          New Session
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-1">
          <img
            src="https://avatars.githubusercontent.com/u/222989595?v=4"
            alt="User Avatar"
            className="w-9 h-9 rounded-full bg-gray-200 object-cover shrink-0"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800">Red Bora</p>
            <p className="text-xs text-blue-500">Focus Level: Pro</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
