import React from "react";

const DATA = [
  { day: "MON", height: 45 },
  { day: "TUE", height: 60 },
  { day: "WED", height: 100, active: true },
  { day: "THU", height: 50 },
  { day: "FRI", height: 75 },
  { day: "SAT", height: 35 },
  { day: "SUN", height: 25 },
];

export default function StudyHabitsChart() {
  return (
    <div className="bg-gray-100 dark:bg-[#1a1d27] rounded-[2rem] p-8 flex flex-col h-full border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">Study Habits</h3>
        <p className="text-sm font-semibold text-gray-500">Daily intensity (hrs)</p>
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 mt-auto pt-8">
        {DATA.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4 flex-1">
            <div className="w-full h-48 flex items-end justify-center">
              <div 
                className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 ${
                  item.active ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700/50"
                }`}
                style={{ height: `${item.height}%` }}
              />
            </div>
            <span className={`text-xs font-extrabold tracking-widest ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
