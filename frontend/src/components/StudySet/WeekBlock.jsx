import React, { useRef, useState, useEffect } from "react";
import { Upload, MoreVertical, FileText, CheckCircle2, Clock, Loader, Edit2, Trash2 } from "lucide-react";
import FilePreviewModal from "./FilePreviewModal";

/**
 * WeekBlock
 * Displays a single week timeline element, its topics, and file uploads.
 */
export default function WeekBlock({ week, isLast, onWeekUpdate }) {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Rename & Delete state
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  
  // Preview State
  const [previewFile, setPreviewFile] = useState(null);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/weeks/${week._id}/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onWeekUpdate(data.week);
    } catch (err) {
      console.error(err.message);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = null; // reset input
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/weeks/${week._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if(res.ok) {
        onWeekUpdate(data.week);
      }
    } catch (err) {
      console.error("Status update error");
    }
  }

  const toggleStatus = () => {
    const nextStatus = week.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED";
    updateStatus(nextStatus);
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/weeks/${week._id}/files/${fileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        onWeekUpdate(data.week);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete failed");
    }
    setActiveDropdownId(null);
  };

  const handleRenameSubmit = async (fileId) => {
    if (!renameValue.trim()) {
      setRenamingId(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/weeks/${week._id}/files/${fileId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ newFileName: renameValue.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        onWeekUpdate(data.week);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Rename failed");
    }
    setRenamingId(null);
  };

  const initiateRename = (file) => {
    setRenameValue(file.fileName);
    setRenamingId(file._id);
    setActiveDropdownId(null);
  };

  const getFileColors = (fileName) => {
    if (!fileName) return "bg-gray-50 dark:bg-gray-500/10 text-gray-500";
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return "bg-red-50 dark:bg-red-500/10 text-red-500";
      case 'docx':
      case 'doc':
        return "bg-blue-50 dark:bg-blue-500/10 text-blue-600";
      case 'pptx':
      case 'ppt':
        return "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600";
      default:
        return "bg-gray-50 dark:bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="flex items-start gap-8 relative group">
      {/* Timeline Dot */}
      <div className={`mt-2 shrink-0 z-10 w-4 h-4 rounded-full border-[3px] border-white dark:border-[#1e212b] shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 ${week.status === 'COMPLETED' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
      
      <div className="flex-1 -mt-1">
        {/* Week Info */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
          <div className="w-[200px] shrink-0">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1 leading-tight tracking-tight">{week.weekNumber}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{week.topicName}</p>
            
            <button 
               onClick={toggleStatus}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer ${
                 week.status === 'COMPLETED' 
                 ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50' 
                 : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50'
               }`}
            >
              {week.status === 'COMPLETED' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              {week.status}
            </button>
          </div>

          {/* Files Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {week.files.map((file) => (
              <div 
                key={file._id} 
                className="flex items-center gap-4 bg-white dark:bg-[#1a1d27] rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Clickable Area for Preview */}
                <div 
                  className="flex-1 flex items-center gap-4 cursor-pointer min-w-0" 
                  onClick={() => setPreviewFile(file)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getFileColors(file.fileName)}`}>
                    <FileText size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {renamingId === file._id ? (
                      <input 
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameSubmit(file._id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit(file._id);
                          if (e.key === 'Escape') setRenamingId(null);
                        }}
                        autoFocus
                        onClick={(e) => e.stopPropagation()} // prevent preview modal
                        className="w-full text-sm font-extrabold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border focus:border-blue-500 rounded px-2 py-0.5 outline-none"
                      />
                    ) : (
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white truncate rounded hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {file.fileName}
                      </h4>
                    )}
                    <p className="text-xs font-medium text-gray-400 mt-0.5">Uploaded • {file.fileSize}</p>
                  </div>
                </div>

                  {/* Dropdown Menu */}
                <div className="relative" ref={activeDropdownId === file._id ? dropdownRef : null}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdownId(activeDropdownId === file._id ? null : file._id);
                    }}
                    className="text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 p-1 rounded transition-colors cursor-pointer active:scale-95"
                  >
                    <MoreVertical size={16} />
                  </button>

                  <div 
                    className={`absolute right-0 top-full mt-2 w-36 bg-white dark:bg-[#1e212b] rounded-xl border border-gray-100 dark:border-gray-800 z-[50] py-1 origin-top-right transition-all duration-200 ease-out ${
                      activeDropdownId === file._id 
                      ? 'opacity-100 scale-100 pointer-events-auto shadow-xl' 
                      : 'opacity-0 scale-95 pointer-events-none shadow-none'
                    }`}
                  >
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer transition-colors"
                      onClick={() => initiateRename(file)}
                    >
                      <Edit2 size={14} /> Rename
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-bold text-red-600 flex items-center gap-2 cursor-pointer transition-colors"
                      onClick={() => handleDeleteFile(file._id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area for this week */}
        <div className="ml-0 md:ml-[224px]"> 
          <div 
             onClick={() => fileInputRef.current.click()}
             className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-400 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group/upload"
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              disabled={uploading}
            />
            
            <div className="w-10 h-10 bg-white dark:bg-[#1a1d27] rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-3 group-hover/upload:scale-110 transition-transform">
              {uploading ? <Loader className="animate-spin" size={18} /> : <Upload size={18} strokeWidth={2.5} />}
            </div>
            <p className="text-sm font-extrabold text-gray-700 dark:text-gray-300">Click to upload or drag files here</p>
            <p className="text-xs font-medium text-gray-400 mt-1">PDF, DOCX, ZIP files up to 50MB</p>
          </div>
        </div>
        
      </div>

      <FilePreviewModal 
        isOpen={!!previewFile} 
        onClose={() => setPreviewFile(null)} 
        file={previewFile}
      />
    </div>
  );
}
