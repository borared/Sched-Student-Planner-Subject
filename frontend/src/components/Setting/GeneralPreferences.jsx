import { useState } from "react";
import { Bell, Moon, Globe, ChevronRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Toggle = ({ value, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out shrink-0 focus:outline-none ${
      value ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${
        value ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default function GeneralPreferences() {
  const [focusNotifications, setFocusNotifications] = useState(true);
  const { darkMode, setDarkMode } = useTheme(); // ← global dark mode

  return (
    <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
        General Preferences
      </p>

      {/* Focus Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <Bell size={15} className={darkMode ? "text-blue-400" : "text-gray-500"} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Focus Notifications</p>
            <p className="text-xs text-gray-400">Alerts for Pomodoro session ends</p>
          </div>
        </div>
        <Toggle value={focusNotifications} onToggle={() => setFocusNotifications((v) => !v)} />
      </div>

      {/* Appearance — controls global dark mode */}
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <Moon size={15} className={darkMode ? "text-blue-400" : "text-gray-500"} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Appearance</p>
            <p className="text-xs text-gray-400">
              {darkMode ? "Dark mode is on" : "Switch to Dark mode Sanctuary"}
            </p>
          </div>
        </div>
        <Toggle value={darkMode} onToggle={() => setDarkMode((v) => !v)} />
      </div>

      {/* Language */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <Globe size={15} className={darkMode ? "text-blue-400" : "text-gray-500"} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Language</p>
            <p className="text-xs text-gray-400">English (US)</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
}