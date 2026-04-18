import React from "react";
import StudySetHeader from "../components/StudySet/StudySetHeader";
import SubjectCard from "../components/StudySet/SubjectCard";
import StatsBlock from "../components/StudySet/StatsBlock";

import { 
  Calculator, 
  Microscope, 
  Compass, 
  TerminalSquare, 
  Globe 
} from "lucide-react";

const TOP_SUBJECTS = [
  {
    id: 1,
    icon: Calculator,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tagLabel: "Active",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Advanced Calculus",
    description: "Multivariable integration, vector fields, and Stokes' theorem.",
    circles: ["bg-blue-500 z-20", "bg-blue-100 z-10", "bg-gray-100 z-0"],
    studySetsCount: 12,
  },
  {
    id: 2,
    icon: Microscope,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    tagLabel: "Lab Week",
    tagColor: "bg-purple-50 text-purple-600",
    title: "Molecular Biology",
    description: "Genetic sequencing, CRISPR-Cas9 mechanisms and cell signaling.",
    circles: ["bg-purple-200 z-10", "bg-gray-100 z-0"],
    studySetsCount: 8,
  },
  {
    id: 3,
    icon: Compass,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    tagLabel: "Review",
    tagColor: "bg-gray-200/60 text-gray-600",
    title: "History of Design",
    description: "From Bauhaus to modern digital interfaces and typography.",
    circles: ["bg-indigo-100 z-30", "bg-blue-500 z-20", "bg-purple-200 z-10", "bg-gray-100 z-0"],
    studySetsCount: 24,
  }
];

const COMPUTER_SYSTEMS = {
  icon: TerminalSquare,
  iconBg: "bg-red-100",
  iconColor: "text-red-500",
  title: "Computer Systems",
  description: "Low-level architecture, memory management, and kernel design.",
  progress: 85,
};

const BOTTOM_SUBJECTS = [
  {
    id: 4,
    icon: Globe,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tagLabel: "New",
    tagColor: "bg-blue-200 text-blue-700",
    title: "Global Economics",
    description: "Trade theories, fiscal policy, and emerging market dynamics.",
    circles: ["bg-blue-500 z-10", "bg-gray-100 z-0"],
    studySetsCount: 4,
  }
];

/**
 * StudySet Page
 * Displays academic subjects categorized in a responsive grid.
 */
export default function StudySet() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Header */}
        <StudySetHeader />

        {/* Section Title & Action Button */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 mb-1">
              Academic Year 2026
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Current Subjects
            </h2>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer">
            <span className="text-lg leading-none mt-[-2px]">+</span> Add Subject
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Row 1 */}
          {TOP_SUBJECTS.map((sub) => (
            <SubjectCard key={sub.id} {...sub} />
          ))}

          {/* Row 2 Group Block */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-50 dark:bg-[#1a1d27] rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 border border-gray-100 dark:border-gray-800">
            <div className="flex-1 min-w-0">
              <SubjectCard {...COMPUTER_SYSTEMS} />
            </div>
            
            <div className="flex-1 min-w-0">
              <StatsBlock />
            </div>
          </div>

          {BOTTOM_SUBJECTS.map((sub) => (
            <SubjectCard key={sub.id} {...sub} />
          ))}

        </div>

        {/* Bottom padding */}
        <div className="h-10" />
      </div>
    </div>
  );
}
