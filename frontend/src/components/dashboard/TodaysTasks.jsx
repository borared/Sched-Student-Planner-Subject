/**
 * Individual Task Card inside the Today's Tasks list
 */
function TaskCard({ task, onToggle }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-colors
          ${
            task.completed
              ? "bg-blue-600 border-blue-600"
              : "border-gray-300 hover:border-blue-400"
          }`}
      >
        {task.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Title + Tags */}
      <div className="flex flex-col gap-1.5">
        <p
          className={`text-sm font-semibold ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag.label}
              className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${tag.style}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * TodaysTasks
 * Receives tasks and toggle handler from parent (Dashboard).
 * State lives in Dashboard so DailyProgress stays in sync.
 */
export default function TodaysTasks({ tasks = [], onToggle }) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">Today's Tasks</h3>
        <button className="text-xs text-blue-600 border border-dashed border-blue-300 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
          View All
        </button>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={onToggle} />
        ))}
      </div>
    </section>
  );
}
