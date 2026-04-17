import { AlertTriangle } from "lucide-react";

/**
 * PrivacyData
 * Warning section for downloading data or deleting the account.
 */
export default function PrivacyData() {
  return (
    <div className="bg-red-50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      {/* Left: icon + text */}
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-black">Privacy &amp; Data</p>
          <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
            Request a copy of your data or permanently delete your account.
          </p>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-3 shrink-0 pl-13 sm:pl-0">
        <button className="text-sm font-semibold text-black hover:text-black transition-colors whitespace-nowrap">
          Download Data
        </button>
        <button className="hover:cursor-pointer bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap">
          Delete Account
        </button>
      </div>
    </div>
  );
}
