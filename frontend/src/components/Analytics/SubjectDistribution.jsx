import React from "react";

export default function SubjectDistribution() {
  // SVG Donut calculation approximations
  // Radius 40 gives circumference ~251.2
  const c = 251.2;
  const mathDash = (42 / 100) * c;
  const historyDash = (28 / 100) * c;
  const othersDash = (30 / 100) * c;

  return (
    <div className="bg-white dark:bg-[#1a1d27] rounded-[2rem] p-8 flex flex-col items-center border border-gray-100 dark:border-gray-800 h-full">
      <h3 className="text-xl font-bold text-gray-900 w-full text-left mb-6">Subject Distribution</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-8 mt-2">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="16" className="stroke-gray-200 dark:stroke-gray-700" />
          
          {/* Others (Light Gray / Purple highlight in mock but actually labeled light gray) */}
          <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="16" 
            strokeDasharray={`${othersDash} ${c}`}
            strokeDashoffset="0"
            className="stroke-gray-200 dark:stroke-gray-600 transition-all duration-1000" />
            
          {/* History (Purple) */}
          <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="16" 
            strokeDasharray={`${historyDash} ${c}`}
            strokeDashoffset={-othersDash}
            className="stroke-purple-800 transition-all duration-1000" />
            
          {/* Mathematics (Blue) */}
          <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="16" 
            strokeDasharray={`${mathDash} ${c}`}
            strokeDashoffset={-(othersDash + historyDash)}
            className="stroke-blue-600 transition-all duration-1000" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
          <span className="text-3xl font-extrabold text-gray-900 leading-none">8</span>
          <span className="text-[10px] font-extrabold tracking-widest text-gray-400 mt-1">SUBJECTS</span>
        </div>
      </div>

      <div className="w-full flex justify-center flex-col gap-4 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-600/30"></span>
            <span className="text-sm font-semibold text-gray-500">Mathematics</span>
          </div>
          <span className="text-sm font-bold text-gray-900">42%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-800 shadow-lg shadow-purple-800/30"></span>
            <span className="text-sm font-semibold text-gray-500">History</span>
          </div>
          <span className="text-sm font-bold text-gray-900">28%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600"></span>
            <span className="text-sm font-semibold text-gray-500">Others</span>
          </div>
          <span className="text-sm font-bold text-gray-900">30%</span>
        </div>
      </div>
    </div>
  );
}
