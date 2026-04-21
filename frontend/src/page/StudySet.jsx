import React, { useState, useEffect } from "react";
import StudySetHeader from "../components/StudySet/StudySetHeader";
import SubjectCard from "../components/StudySet/SubjectCard";
import StatsBlock from "../components/StudySet/StatsBlock";
import AddSubjectModal from "../components/StudySet/AddSubjectModal";
import SubjectDetail from "../components/StudySet/SubjectDetail";
import { Book, AlertCircle, Loader } from "lucide-react";

/**
 * StudySet Page
 * Displays academic subjects fetched from the backend.
 */
const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : window.location.origin)
).replace(/\/$/, "");
export default function StudySet() {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    // Re-trigger a short transition so filtered results appear smoothly.
    setShowSearchResults(false);
    const timer = setTimeout(() => setShowSearchResults(true), 70);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch subjects");
      }
      
      setSubjects(data.subjects);
      setLoading(false);
    } catch (err) {
      const isNetworkError = err?.name === "TypeError" && err?.message?.includes("fetch");
      setError(
        isNetworkError
          ? "Unable to reach the server. Please make sure backend is running."
          : err.message
      );
      setLoading(false);
    }
  };

  const handleSaveSubject = async (subjectData) => {
    try {
      const token = localStorage.getItem("token");
      const isEditing = !!subjectToEdit;
      const url = isEditing 
        ? `${API_BASE_URL}/api/subjects/${subjectToEdit.id}`
        : `${API_BASE_URL}/api/subjects`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subjectData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to save subject");
      }

      if (isEditing) {
        setSubjects((prev) => prev.map(s => s._id === data.subject._id ? data.subject : s));
      } else {
        setSubjects([data.subject, ...subjects]);
      }
      
      setIsModalOpen(false);
      setSubjectToEdit(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const openEditModal = (sub) => {
    setSubjectToEdit(sub);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSubjectToEdit(null);
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject? All associated weeks will be untracked.")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/subjects/${subjectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete subject");
      
      setSubjects((prev) => prev.filter(s => s._id !== subjectId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Maps backend subjects into format expected by SubjectCard
  const filteredSubjects = subjects.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (sub.description && sub.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formattedSubjects = filteredSubjects.map((sub) => ({
    id: sub._id,
    icon: Book,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-800",
    title: sub.name,
    description: sub.description || "No description provided.",
    midTermDate: sub.midTermDate,
    finalExamDate: sub.finalExamDate,
    tagLabel: "Active",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    circles: [
      { color: sub.color, zIndex: 10 },
      { class: "bg-gray-100 dark:bg-gray-700", zIndex: 0 }
    ],
    studySetsCount: 0,
    color: sub.color,
    onDelete: () => handleDeleteSubject(sub._id),
    onEdit: () => openEditModal({
      id: sub._id,
      name: sub.name,
      description: sub.description,
      midTermDate: sub.midTermDate,
      finalExamDate: sub.finalExamDate,
      color: sub.color
    })
  }));

  if (selectedSubject) {
    return (
      <SubjectDetail 
        subjectId={selectedSubject.id} 
        subject={selectedSubject} 
        onBack={() => setSelectedSubject(null)} 
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Header */}
        <StudySetHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <span className="text-lg leading-none mt-[-2px]">+</span> Add Subject
          </button>
        </div>

        {/* Dynamic Display Area */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
             <Loader className="animate-spin text-blue-500" size={32} />
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-20 text-red-500">
             <AlertCircle size={48} className="mb-4" />
             <p className="font-semibold">{error}</p>
           </div>
        ) : formattedSubjects.length === 0 ? (
           <div className={`flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300 transition-all duration-300 ease-out ${showSearchResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              <Book size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No subjects yet</h3>
              <p className="text-gray-500 text-sm mb-6">Create your first subject to start organizing your study sets.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Create Subject
              </button>
           </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-out ${showSearchResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            
            {/* Render all Subject Cards */}
            {formattedSubjects.map((sub, index) => {
              if (index === 3) {
                 return (
                    <React.Fragment key="group-block">
                      <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-50 dark:bg-[#1a1d27] rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex-1 min-w-0">
                          <StatsBlock />
                        </div>
                      </div>
                      <SubjectCard key={sub.id} {...sub} onClick={() => setSelectedSubject(sub)} />
                    </React.Fragment>
                 )
              }
              return <SubjectCard key={sub.id} {...sub} onClick={() => setSelectedSubject(sub)} />
            })}

            {/* If we have less than 4 items, the StatsBlock wouldn't render above. Let's put it at the end if omitted */}
            {formattedSubjects.length > 0 && formattedSubjects.length <= 3 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-50 dark:bg-[#1a1d27] rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 border border-gray-100 dark:border-gray-800">
                <div className="flex-1 min-w-0">
                  <StatsBlock />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom padding */}
        <div className="h-10" />
      </div>
      
      {/* Modal */}
      <AddSubjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveSubject}
        subjectToEdit={subjectToEdit}
      />
    </div>
  );
}
