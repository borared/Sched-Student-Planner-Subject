import SettingsHeader from "../components/Setting/SettingsHeader";
import ProfileCard from "../components/Setting/ProfileCard";
import AccountSession from "../components/Setting/AccountSession";
import GeneralPreferences from "../components/Setting/GeneralPreferences";
import SubscriptionStatus from "../components/Setting/SubscriptionStatus";
import PrivacyData from "../components/Setting/PrivacyData";

/**
 * Settings Page
 * Composes all Setting section components.
 * Scrollable — not fixed to 100vh.
 */
export default function Settings({ user, onLogout }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-8 flex flex-col gap-6">

        {/* Header */}
        <SettingsHeader />

        {/* Row 1: Profile + Account Session */}
        <div className="flex gap-4">
          <ProfileCard user={user} />
          <AccountSession onLogout={onLogout} />
        </div>

        {/* Row 2: General Preferences + Subscription Status */}
        <div className="flex gap-4">
          <GeneralPreferences />
          <SubscriptionStatus />
        </div>

        {/* Row 3: Privacy & Data */}
        <PrivacyData />

        {/* Bottom breathing room */}
        <div className="h-6" />
      </div>
    </div>
  );
}
