import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

/**
 * FilePreviewModal
 * Provides an in-browser interactive preview for PDF and Image files.
 */
export default function FilePreviewModal({ isOpen, onClose, file }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !file) return null;

  const getFullUrl = (url) => {
    if (!url) return "";
    return `http://localhost:5000${url}`;
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />
      <div className="fixed z-[110] inset-4 md:inset-10 flex flex-col bg-white dark:bg-[#1a1d27] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1e212b]">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white truncate max-w-[300px] md:max-w-[500px]">
              {file.fileName}
            </h3>
            <span className="text-xs font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
              {file.fileSize}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href={getFullUrl(file.fileUrl)} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={20} />
            </a>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content - Iframe Viewer */}
        <div className="flex-1 bg-gray-100 dark:bg-[#13151a]">
          <iframe
            src={getFullUrl(file.fileUrl)}
            className="w-full h-full border-none"
            title={file.fileName}
          />
        </div>
      </div>
    </>
  );
}
