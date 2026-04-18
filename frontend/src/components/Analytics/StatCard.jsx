import React from "react";

/**
 * StatCard
 * Miniature cards for high-level KPIs displaying specific mini-visualizations at the bottom.
 */
export default function StatCard({ title, value, unit, percent, type = "bars", bars = [] }) {
  return (
    <div className="bg-white dark:bg-[#1a1d27] rounded-3xl p-6 flex flex-col justify-between h-40 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-2">{title}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</span>
          {percent && (
            <span className="text-sm font-bold text-blue-600">+{percent}%</span>
          )}
          {unit && (
            <span className="text-sm font-semibold text-gray-500">{unit}</span>
          )}
        </div>
      </div>
      
      {/* Bottom visualization */}
      <div className="h-8 flex items-end">
        {type === "bars" && bars.length > 0 && (
          <div className="flex gap-1.5 items-end h-full">
            {bars.map((h, i) => {
              const isMax = h === Math.max(...bars);
              return (
                <div 
                  key={i} 
                  className={`w-8 rounded-t-sm ${isMax ? 'bg-blue-600' : 'bg-blue-100 dark:bg-blue-900/30'}`}
                  style={{ height: `${h}%` }}
                />
              )
            })}
          </div>
        )}
        
        {type === "line" && (
          <div className="w-full h-1.5 rounded-full bg-blue-600" />
        )}
      </div>
    </div>
  );
}
