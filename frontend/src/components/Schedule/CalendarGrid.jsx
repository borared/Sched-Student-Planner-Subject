import UpcomingPanel from "./UpcomingPanel";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Sample events — keyed by "YYYY-M-D"
const EVENTS = {
  "2023-10-2":  [{ label: "Organic Chem ...", color: "bg-purple-100 text-purple-700" }],
  "2023-10-5":  [
    { label: "Thesis Outline", color: "bg-blue-500 text-white" },
    { label: "Reading: Plato", color: "bg-orange-200 text-orange-700" },
  ],
  "2023-10-11": [{ label: "Design Review", color: "bg-blue-500 text-white" }],
  "2023-10-13": [{ label: "Final Submission", color: "bg-red-400 text-white" }],
  "2023-10-17": [{ label: "Lab Work", color: "bg-purple-100 text-purple-700" }],
  "2023-10-25": [{ label: "Team Call", color: "bg-blue-100 text-blue-700" }],
};

function buildCalendar(year, month) {
  // month is 0-based
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Adjust: week starts Monday (0=Mon…6=Sun)
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const days = [];

  // Prev month fill
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, current: false });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), current: true });
  }

  // Next month fill — complete to 6 rows × 7 = 42 cells
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), current: false });
  }

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function eventKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * CalendarGrid
 * Month grid with day numbers, event pills, today highlight, and UpcomingPanel overlay.
 */
export default function CalendarGrid({ year, month }) {
  const today = new Date();
  const weeks = buildCalendar(year, month);

  return (
    <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {DAYS.map((d) => (
          <div key={d} className="py-3 text-center text-xs font-bold text-gray-400 tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 border-b border-gray-200 last:border-b-0">
          {week.map((cell, di) => {
            const isToday =
              cell.date.getFullYear() === today.getFullYear() &&
              cell.date.getMonth() === today.getMonth() &&
              cell.date.getDate() === today.getDate();

            const events = EVENTS[eventKey(cell.date)] || [];

            // Show UpcomingPanel in last 2 cells of the 4th week row (overlays SAT-SUN)
            const isUpcomingSlot = wi === 3 && di === 5;
            const isUpcomingHidden = wi === 3 && di === 6;
            if (isUpcomingHidden) return null;

            return (
              <div
                key={di}
                className={`relative p-2 min-h-[110px] border-r border-gray-200 last:border-r-0 transition-colors
                  ${cell.current ? "bg-white hover:bg-blue-50/30" : "bg-gray-50/60"}
                  ${isToday ? "ring-2 ring-blue-500 ring-inset" : ""}
                  ${isUpcomingSlot ? "col-span-2" : ""}
                `}
              >
                {/* Day number */}
                <div className="flex justify-start mb-1.5">
                  <span
                    className={`text-sm font-semibold leading-none w-7 h-7 flex items-center justify-center rounded-full
                      ${isToday
                        ? "bg-blue-600 text-white"
                        : cell.current
                        ? "text-gray-700"
                        : "text-gray-300"
                      }`}
                  >
                    {cell.date.getDate()}
                  </span>
                </div>

                {/* Events */}
                {!isUpcomingSlot && events.map((ev, ei) => (
                  <div
                    key={ei}
                    className={`text-[11px] font-semibold px-2 py-1 rounded-lg mb-1 truncate ${ev.color}`}
                  >
                    {ev.label}
                  </div>
                ))}

                {/* Upcoming Panel overlay in the SAT-SUN span slot */}
                {isUpcomingSlot && (
                  <div className="absolute inset-0 p-2 flex items-start justify-start">
                    <UpcomingPanel />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
