import React from "react";
import { Trash2, Edit2 } from "lucide-react";

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
  color, // theme color
  onDelete, // Delete handler
  onEdit, // Edit handler
  onClick,
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
    <div 
      onClick={onClick}
      className={`hover:scale-[1.02] group relative overflow-hidden rounded-3xl p-6 flex flex-col h-full shadow-sm hover:shadow-xl dark:shadow-none hover:bg-white dark:hover:bg-[#252836] transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 dark:border-gray-800 dark:hover:border-gray-700 ${bgColor}`}
    >
      {/* Top Row: Icon & Tag */}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {Icon && <Icon size={20} className={iconColor} strokeWidth={2.5} />}
        </div>
        <div className="flex items-center gap-1 relative z-10">
          {tagLabel && (
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full ${tagColor} mr-1`}>
              {tagLabel}
            </span>
          )}
          {onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="text-gray-300 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10"
              title="Edit Subject"
            >
              <Edit2 size={16} strokeWidth={2.5} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
              title="Delete Subject"
            >
              <Trash2 size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer: Progress OR Circles + Count */}
      <div className="mt-auto">
        {progress !== undefined ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
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
              {circles.map((circle, i) => {
                const isString = typeof circle === 'string';
                return (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#1e212b] flex-shrink-0 ${isString ? circle : (circle.class || '')}`}
                    style={!isString && circle.color ? { backgroundColor: circle.color, zIndex: circle.zIndex } : { zIndex: !isString ? circle?.zIndex : undefined }}
                  />
                );
              })}
            </div>
            {studySetsCount !== undefined && (
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                {studySetsCount} Study Sets
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Colored Line Effect mapping to Theme Color */}
      <div 
        className="absolute left-0 bottom-0 w-full h-1.5 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" 
        style={{ backgroundColor: color || '#2563eb' }}
      />
    </div>
  );
}
