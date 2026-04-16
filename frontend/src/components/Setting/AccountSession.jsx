import { useState } from "react";
import { LogOut } from "lucide-react";
import LogoutModal from "../global/LogoutModal";

/**
 * AccountSession
 * Shows a warning to sign out of all devices.
 * Logout triggers the confirmation modal.
 */
export default function AccountSession({ onLogout }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <LogoutModal
        isOpen={showModal}
        onConfirm={() => {
          setShowModal(false);
          onLogout();
        }}
        onCancel={() => setShowModal(false)}
      />

      <div className="w-56 bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between shrink-0">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Account Session
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Sign out of{" "}
            <span className="text-blue-500 font-medium">all active devices</span>{" "}
            to clear your workspace.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 flex items-center justify-between w-full border border-red-200 rounded-xl px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
        >
          Logout
          <LogOut size={15} />
        </button>
      </div>
    </>
  );
}
