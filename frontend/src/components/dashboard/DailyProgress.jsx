/**
 * DailyProgress
 * Shows the motivational heading, task completion count, and a progress bar.
 * `completed` and `total` are always passed in from Dashboard (the source of truth).
 */
export default function DailyProgress({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getMotivation = () => {
    if (percentage === 100) return "All done! 🎉";
    if (percentage >= 60) return "Almost there.";
    if (percentage >= 30) return "Good progress.";
    return "Let's get started.";
  };

  return (
    <section className="mb-8">
      {/* Label */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
        Daily Progress
      </p>

      {/* Heading + count row */}
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {getMotivation()}
        </h2>
        <span className="text-sm font-semibold text-blue-600">
          {completed} of {total} tasks completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
}
