import React from "react";

/**
 * SubjectCard
 * Reusable card for study sets and subjects with optional progress bar or study set count.
 */
export default function SubjectCard({
  icon: Icon,
  iconBg,
  iconColor,
  tagLabel,
  tagColor,
  title,
  description,
  circles = [],
  studySetsCount,
  progress,
  bgColor = "bg-gray-50 dark:bg-[#1e212b]", // Default card bg
}) {
  let progressColor = "bg-red-500";
  let progressTextColor = "text-red-600";

  if (progress >= 80) {
    progressColor = "bg-green-500";
    progressTextColor = "text-green-600";
  } else if (progress >= 50) {
    progressColor = "bg-amber-500";
    progressTextColor = "text-amber-600";
  }

  return (
    <div className={`hover:scale-105 group relative overflow-hidden rounded-3xl p-6 flex flex-col h-full hover:shadow-md hover:bg-white transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 dark:border-gray-800 border-none ${bgColor}`}>
      {/* Top Row: Icon & Tag */}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {Icon && <Icon size={20} className={iconColor} strokeWidth={2.5} />}
        </div>
        {tagLabel && (
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full ${tagColor}`}>
            {tagLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Footer: Progress OR Circles + Count */}
      <div className="mt-auto">
        {progress !== undefined ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ease-out ${progressColor}`} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={`text-xs font-bold tracking-wide ${progressTextColor}`}>{progress}% Progress</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* Overlapping circles */}
            <div className="flex -space-x-2">
              {circles.map((colorClass, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-full border-2 border-gray-50 flex-shrink-0 ${colorClass}`}
                />
              ))}
            </div>
            {studySetsCount !== undefined && (
              <span className="text-[11px] font-bold text-gray-700">
                {studySetsCount} Study Sets
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Blue Line Effect */}
      <div className="absolute left-0 bottom-0 w-full h-1.5 bg-blue-600 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </div>
  );
}
