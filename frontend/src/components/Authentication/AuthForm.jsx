import { useState } from "react";
import { Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";

const API_URL = "http://localhost:5000/api/auth";

/**
 * AuthForm
 * Left panel — handles sign-up / login logic and renders the form UI.
 * Props:
 *   onLogin (fn) — called with user data after successful authentication
 */
export default function AuthForm({ onLogin }) {
  const [activeTab, setActiveTab] = useState("signup"); // "signup" | "login"
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Email / Password Submit ─────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        activeTab === "signup" ? `${API_URL}/register` : `${API_URL}/login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Authentication failed.");
        return;
      }

      // Save token for future requests
      localStorage.setItem("token", data.token);

      // Fetch full user info
      const meRes = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const meData = await meRes.json();

      onLogin({
        id: meData.id,
        email: meData.email,
        name: meData.email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${meData.email}`,
      });
    } catch (err) {
      setLoading(false);
      setError("Cannot reach the server. Make sure the backend is running on port 5000.");
    }
  };

  // ── Switch between sign-up and login ───────────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowEmailForm(false);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between w-1/2 px-16 py-12">
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <img
            src="/ShechFavicon.png"
            alt="Sched Logo"
            className="w-8 h-8 rounded-lg object-cover"
          />
        </div>
        <span className="text-2xl font-bold text-gray-900">Sched</span>
      </div>

      {/* ── Form Content ── */}
      <div className="flex flex-col gap-6 -mt-12">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {activeTab === "signup" ? "Join the Sched" : "Welcome back"}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Design your ideal focus environment and reclaim your cognitive space.
          </p>
        </div>

        {/* Choice screen (social + email button) */}
        {!showEmailForm ? (
          <>
            <div className="flex gap-3">
              {/* Google OAuth */}
              <a
                href="http://localhost:5000/auth/google"
                className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </a>

              {/* GitHub — coming soon */}
              <button
                disabled
                title="GitHub OAuth coming soon"
                className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed"
              >
                <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">
              Social login requires OAuth credentials — use email/password below
            </p>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email button */}
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
            >
              <Mail size={16} />
              {activeTab === "signup" ? "Sign up with Email" : "Log in with Email"}
            </button>
          </>
        ) : (
          /* Email / Password form */
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-2.5 pr-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-1">
              {/* Back */}
              <button
                type="button"
                onClick={() => { setShowEmailForm(false); setError(""); }}
                className="p-3 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                {loading
                  ? "Please wait…"
                  : activeTab === "signup"
                  ? "Create Account"
                  : "Log In"}
              </button>
            </div>
          </form>
        )}

        {/* Switch tab */}
        <p className="text-center text-sm text-gray-500">
          {activeTab === "signup" ? (
            <>
              Already have an account?{" "}
              <button onClick={() => switchTab("login")} className="text-blue-600 font-semibold hover:underline">
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button onClick={() => switchTab("signup")} className="text-blue-600 font-semibold hover:underline">
                Sign up
              </button>
            </>
          )}
        </p>
      </div>

      {/* ── Legal ── */}
      <p className="text-xs text-gray-400 leading-relaxed">
        By signing up, you agree to Sched's{" "}
        <span className="underline cursor-pointer">Terms of Service</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
}
