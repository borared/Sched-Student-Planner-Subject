import React from "react";
import { Sigma, BookOpen, FlaskConical } from "lucide-react";

const HISTORY_DATA = [
  {
    title: "Calculus Review",
    timeAgo: "Today • 14:20",
    duration: "90 min",
    focus: "HIGH FOCUS",
    focusColor: "text-blue-600",
    icon: Sigma,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    title: "French Revolution",
    timeAgo: "Yesterday • 10:15",
    duration: "45 min",
    focus: "MODERATE",
    focusColor: "text-gray-500",
    icon: BookOpen,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Organic Chem",
    timeAgo: "Oct 24 • 16:30",
    duration: "120 min",
    focus: "DEEP FOCUS",
    focusColor: "text-blue-600",
    icon: FlaskConical,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500"
  }
];

export default function FocusHistory() {
  return (
    <div className="bg-gray-100 dark:bg-[#1a1d27] rounded-[2rem] p-8 flex flex-col border border-gray-100 dark:border-gray-800 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Focus History</h3>
      
      <div className="flex flex-col gap-4">
        {HISTORY_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white dark:bg-[#1e212b] rounded-2xl p-4 flex items-center justify-between border border-transparent dark:border-gray-800 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center ${item.iconBg}`}>
                  <Icon size={18} className={item.iconColor} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{item.timeAgo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-gray-900 leading-none mb-1.5">{item.duration}</p>
                <p className={`text-[9px] font-extrabold uppercase tracking-widest ${item.focusColor}`}>
                  {item.focus}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
