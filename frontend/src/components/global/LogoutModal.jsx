import { useEffect } from "react";
import { LogOut } from "lucide-react";

/**
 * LogoutModal
 * Smooth confirmation dialog before logging out.
 * Props:
 *   isOpen    — controls visibility
 *   onConfirm — called when user confirms logout
 *   onCancel  — called when user cancels
 */
export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onCancel}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Modal Card ── */}
      <div
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2
          transition-all duration-300 ease-out w-[340px]
          ${isOpen
            ? "-translate-y-1/2 opacity-100 scale-100"
            : "-translate-y-[48%] opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Icon header */}
          <div className="flex flex-col items-center pt-8 pb-4 px-6">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <LogOut className="text-red-500" size={26} />
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 text-center">
              Log out of Sched?
            </h2>
            <p className="text-sm text-gray-400 text-center mt-1.5 leading-relaxed">
              You'll need to sign in again to continue your focus sessions.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-6" />

          {/* Actions */}
          <div className="flex gap-3 p-5">
            {/* Cancel */}
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors hover:cursor-pointer"
            >
              Stay
            </button>

            {/* Confirm logout */}
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl transition-all hover:cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
