import React from "react";
import { Calendar } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 mb-1">
          Performance Analytics
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Your Cognitive Journey
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-gray-100 dark:bg-[#1e212b] hover:bg-gray-200 dark:hover:bg-[#2a2d3a] text-gray-700 dark:text-gray-300 text-sm font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
          Last 30 Days
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#1e212b] hover:bg-gray-200 dark:hover:bg-[#2a2d3a] text-gray-600 dark:text-gray-400 rounded-xl transition-colors cursor-pointer">
          <Calendar size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
