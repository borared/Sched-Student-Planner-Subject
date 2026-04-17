/**
 * ProfileCard
 * Displays the logged-in user's avatar, name, email, and plan badges.
 */
export default function ProfileCard({ user }) {
  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  const displayEmail = user?.email || "user@example.com";
  const avatarSrc =
    user?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayEmail}`;

  return (
    <div className="flex-1 bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm min-w-0">
      {/* Avatar with online dot */}
      <div className="relative shrink-0">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-20 h-20 rounded-full object-cover bg-gray-100"
        />
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full" />
      </div>

      {/* Info */}
      <div className="min-w-0">
        <h2 className="text-2xl font-bold text-gray-900 truncate">{displayName}</h2>
        <p className="text-sm text-gray-400 mb-3 truncate">{displayEmail}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-600 uppercase tracking-wide whitespace-nowrap">
            Premium Plan
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 uppercase tracking-wide whitespace-nowrap">
            Top 5% Focus
          </span>
        </div>
      </div>
    </div>
  );
}
