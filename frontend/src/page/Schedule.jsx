import { useState } from "react";
import ScheduleHeader from "../components/Schedule/ScheduleHeader";
import CalendarGrid from "../components/Schedule/CalendarGrid";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Schedule Page
 * Composes the Schedule header and Calendar grid.
 * Scrollable layout, expanding wide to fit content.
 */
export default function Schedule() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const handlePrev = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleNext = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleToday = () => {
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
  };

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <ScheduleHeader 
          monthLabel={monthLabel}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
        <CalendarGrid year={year} month={month} />
        {/* Bottom breathing room */}
        <div className="h-6" />
      </div>
    </div>
  );
}
