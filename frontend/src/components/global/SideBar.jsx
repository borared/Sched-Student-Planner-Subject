import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";
import LogoutModal from "./LogoutModal";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Schedule", icon: CalendarDays },
  { label: "Study Sets", icon: BookOpen },
  { label: "Analytics", icon: BarChart2 },
  { label: "Settings", icon: Settings },
];

export default function SideBar({
  user,
  onLogout,
  activePage = "Dashboard",
  onNavigate,
  className = "",
  onItemSelect,
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* ── Logout Confirmation Modal ── */}
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={() => {
          setShowLogoutModal(false);
          onLogout();
        }}
        onCancel={() => setShowLogoutModal(false)}
      />

      <aside className={`w-60 h-screen bg-white flex flex-col px-4 py-6 shrink-0 ${className}`}>

        {/* ── Brand ── */}
        <div className="mb-8 px-2 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/ShechFavicon.png"
              alt="Sched Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Sched</h1>
              <p className="text-xs text-gray-400 mt-0.5">Focus Mode</p>
            </div>
          </div>
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = activePage === label;
            return (
              <button
                key={label}
                onClick={() => {
                  onNavigate?.(label);
                  onItemSelect?.();
                }}
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
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Bora"}
                alt="User Avatar"
                className="w-9 h-9 rounded-full bg-gray-200 object-cover shrink-0"
              />
              <div className="leading-tight overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate max-w-[100px]">
                  {user?.name || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-blue-500">Focus Level: Pro</p>
              </div>
            </div>

            {/* Logout Button — opens modal instead of logging out directly */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Log out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
