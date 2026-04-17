/**
 * SubscriptionStatus
 * Shows the user's Pro plan, renewal date, billing link, and storage bar.
 */
export default function SubscriptionStatus() {
  const storageUsed = 65;

  return (
    <div className="w-56 bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4 shrink-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        Subscription Status
      </p>

      {/* Plan heading */}
      <div>
        <p className="text-3xl font-extrabold text-gray-900">Pro</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-400">Renews July 12, 2024</p>
          <button className="text-xs font-semibold text-blue-500 hover:underline whitespace-nowrap ml-2">
            Manage Billing
          </button>
        </div>
      </div>

      {/* Storage bar */}
      <div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${storageUsed}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          You've used {storageUsed}% of your cloud storage for study sets and recorded sessions this month.
        </p>
      </div>
    </div>
  );
}
