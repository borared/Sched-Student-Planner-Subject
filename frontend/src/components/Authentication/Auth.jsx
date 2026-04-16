import AuthForm from "./AuthForm";
import Decoration from "./Decoration";

/**
 * Auth
 * Composes the two-column authentication page:
 *   Left  → AuthForm   (login / sign-up logic)
 *   Right → Decoration (teal panel + quote card)
 */
export default function Auth({ onLogin }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <AuthForm onLogin={onLogin} />
      <Decoration />
    </div>
  );
}
