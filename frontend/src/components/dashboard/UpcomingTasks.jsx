/**
 * UpcomingTasks
 * Right-panel card showing upcoming assignments with date and due-in label.
 */

const upcomingItems = [
  { month: "OCT", day: "14", title: "Research Paper Draft", due: "Due in 2 days" },
  { month: "OCT", day: "16", title: "Lab Report: Chemistry", due: "Due in 4 days", bold: true },
  { month: "OCT", day: "19", title: "History Seminar Prep", due: "Due in 7 days" },
];

export default function UpcomingTasks() {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="text-base font-bold text-gray-900 mb-4">Upcoming</h3>

      <div className="flex flex-col gap-4">
        {upcomingItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Date Stamp */}
            <div className="flex flex-col items-center min-w-[36px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                {item.month}
              </span>
              <span className="text-xl font-extrabold text-gray-800 leading-tight">
                {item.day}
              </span>
            </div>

            {/* Task Info */}
            <div>
              <p className={`text-sm leading-tight ${item.bold ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.due}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
