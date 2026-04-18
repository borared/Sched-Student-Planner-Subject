import React from "react";

export default function CompletionTrends() {
  return (
    <div className="bg-white dark:bg-[#1a1d27] rounded-[2rem] p-8 flex flex-col justify-between h-full border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900">Completion Trends</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600">Tasks</span>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-end">
        <div className="relative w-full h-32">
          {/* Faint Light Blue Curve (Previous Period) */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30">
            <path 
              d="M0 25 C 20 20, 30 10, 50 15 C 70 20, 80 40, 100 10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-blue-300"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Solid Blue Curve (Current Period) */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path 
              d="M0 30 C 15 28, 25 25, 40 25 C 55 25, 65 5, 80 25 C 90 35, 95 30, 100 15" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className="text-blue-600 drop-shadow-md"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* X-axis Labels */}
        <div className="flex justify-between items-center mt-6 px-1">
          {["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"].map(week => (
            <span key={week} className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
              {week}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
