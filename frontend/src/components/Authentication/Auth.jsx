import { useState } from "react";
import { Mail } from "lucide-react";

/**
 * Auth Page
 * Left: sign-up form with social + email options
 * Right: decorative teal panel with a philosophy quote card
 */
export default function Auth() {
  const [activeTab, setActiveTab] = useState("signup"); // "signup" | "login"

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* ══════════════════════════════════════
          LEFT PANEL — Form
      ══════════════════════════════════════ */}
      <div className="flex flex-col justify-between w-1/2 px-16 py-12">
        {/* Top: Logo */}
        <div className="flex items-center gap-2.5">
          {/* Blue icon badge */}
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">Sched</span>
        </div>

        {/* Middle: Form Content */}
        <div className="flex flex-col gap-6 -mt-12">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {activeTab === "signup" ? "Join the Sched" : "Welcome back"}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Design your ideal focus environment and reclaim your cognitive
              space.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            {/* Google */}
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {/* Google "G" SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button className="flex-1 flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {/* GitHub icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign up with Email button */}
          <button className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
            <Mail size={16} />
            {activeTab === "signup" ? "Sign up with Email" : "Log in with Email"}
          </button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-500">
            {activeTab === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>

        {/* Bottom: Legal */}
        <p className="text-xs text-gray-400 leading-relaxed">
          By signing up, you agree to Sanctuary's{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Decorative teal panel
      ══════════════════════════════════════ */}
      <div
        className="relative w-1/2 flex flex-col items-center justify-end pb-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #5eb8c4 0%, #3a9aab 30%, #1e7a8a 60%, #155f6e 100%)",
        }}
      >
        {/* Sunburst rays */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://blog-cdn.lottiefiles.com/cdn-cgi/image/width=1200,quality=80,format=auto/2024/02/Comprehensive-Guide-to-Lottie-Creator---Cover.png")`,
          }}
        />

        {/* Slide dots — top right */}
        <div className="absolute top-10 right-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-80" />
          <div className="w-2 h-2 rounded-full bg-white opacity-40" />
          <div className="w-2 h-2 rounded-full bg-white opacity-40" />
        </div>

        {/* Quote card */}
        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 mx-10 w-[340px]">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              The Philosophy
            </span>
          </div>

          {/* Quote text */}
          <p className="text-xl font-extrabold text-gray-900 leading-snug mb-5">
            Focus is not the absence of noise, but the presence of clarity.
          </p>

          {/* Attribution */}
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
              alt="Marcus Aurelius"
              className="w-9 h-9 rounded-full bg-gray-200 object-cover shrink-0"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">
                Marcus Aurelius
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Design Lead, Sanctuary
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
