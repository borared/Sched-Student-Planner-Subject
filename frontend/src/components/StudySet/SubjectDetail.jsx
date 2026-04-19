import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Plus, Loader, AlertCircle } from "lucide-react";
import WeekBlock from "./WeekBlock";

/**
 * SubjectDetail Page
 * Renders an expansive view of a specific subject, week tracking, and file uploads.
 */
export default function SubjectDetail({ subjectId, subject, onBack }) {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (subjectId) {
      fetchWeeks();
    }
  }, [subjectId]);

  const fetchWeeks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/subjects/${subjectId}/weeks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch weeks");

      setWeeks(data.weeks);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddWeek = async () => {
    try {
      const token = localStorage.getItem("token");
      const weekNumber = `Week ${weeks.length + 1}`;
      const res = await fetch(`http://localhost:5000/api/subjects/${subjectId}/weeks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weekNumber, topicName: "New Topic..." }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setWeeks([...weeks, data.week]);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!subject) return null;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-transparent relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-3 hover:text-blue-700 hover:-translate-x-1.5 active:scale-95 transition-all duration-300 ease-out cursor-pointer group"
            >
              <ArrowLeft size={16} strokeWidth={3} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Study Sets
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{subject.title}</h1>
          </div>
          <button className="flex items-center gap-2 bg-gray-200/60 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
            <Download size={16} /> Export Archive
          </button>
        </div>

        {/* Top Blocks: Course Overview & Progress */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Overview Block */}
          <div className="flex-[2] bg-white dark:bg-[#1e212b] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 border-none shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle size={20} className="text-blue-600" />
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Course Overview</h3>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1">
              {subject.description || "Detailed overview and learning objectives for this course..."}
            </p>
            
            <div className="flex items-end gap-12 mt-auto">
              <div>
                <span className="block text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Upcoming Milestone</span>
                <span className="text-base font-extrabold text-blue-600">{subject.midTermDate ? "Midterm Review" : "Assignment 1"}</span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Completion Rate</span>
                <span className="text-base font-extrabold text-gray-900 dark:text-white">42% Courseware</span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Next Class</span>
                <span className="text-base font-extrabold text-gray-900 dark:text-white">Mon, 10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Progress Block */}
          <div className="flex-1 bg-blue-600 rounded-3xl p-8 shadow-lg shadow-blue-600/20 text-white relative overflow-hidden flex flex-col items-center justify-center h-full">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <div className="w-48 h-48 rounded-full border-[24px] border-white/40 absolute -top-8 -right-8 pointer-events-none" />
            </div>
            <div className="relative z-10 text-center w-full">
              <h3 className="text-lg font-extrabold mb-2 text-left">Academic Progress</h3>
              <p className="text-sm font-medium text-white/80 leading-relaxed text-left mb-8">
                Maintain your focus to reach 60% by Friday.
              </p>
              {/* Circular Progress Mock */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="145.7" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black">42<span className="text-sm">%</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weeks Flow */}
        <div className="bg-white dark:bg-[#1e212b] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 border-none shadow-sm mt-4 relative">
           
           {/* Decorative Timeline Line */}
           <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-gray-100 dark:bg-gray-800" />

           {loading ? (
             <div className="flex justify-center items-center py-20"><Loader className="animate-spin text-blue-500" size={32} /></div>
           ) : error ? (
             <div className="text-center py-10 text-red-500 font-medium">{error}</div>
           ) : (
             <div className="flex flex-col gap-12 relative z-10">
               {weeks.map((week, index) => (
                 <WeekBlock 
                   key={week._id} 
                   week={week} 
                   isLast={index === weeks.length - 1} 
                   onWeekUpdate={(updatedWeek) => {
                     const updatedWeeks = [...weeks];
                     updatedWeeks[index] = updatedWeek;
                     setWeeks(updatedWeeks);
                   }}
                 />
               ))}

               {/* Add Week Button */}
               <div className="flex items-center justify-center pt-8 border-t border-gray-100/50 dark:border-gray-800/50">
                 <button 
                   onClick={handleAddWeek}
                   className="flex items-center gap-2 text-sm font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-sm cursor-pointer"
                 >
                   <Plus size={18} strokeWidth={3} />
                   Add New Week
                 </button>
               </div>
             </div>
           )}

        </div>
        
        <div className="h-20" />
      </div>
    </div>
  );
}
