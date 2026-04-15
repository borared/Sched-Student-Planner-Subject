import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const FOCUS_SECONDS = 25 * 60; // 25 minutes

/**
 * FocusTimer
 * Dark Pomodoro-style timer card with start / pause / reset functionality.
 */
export default function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleToggle = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(FOCUS_SECONDS);
  };

  // Format mm:ss
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="bg-gray-900 rounded-2xl p-5 text-white mt-4">
      {/* Label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
        Signature Session
      </p>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-white mb-4">
        Deep Focus Timer
      </h3>

      {/* Timer Display + Controls */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl font-black tabular-nums tracking-tight">
          {minutes}:{seconds}
        </span>

        <div className="flex items-center gap-2">
          {/* Play / Pause */}
          <button
            onClick={handleToggle}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors"
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-400 leading-relaxed">
        Boost your productivity with the Pomodoro technique. Start a timed
        interval now.
      </p>
    </div>
  );
}
