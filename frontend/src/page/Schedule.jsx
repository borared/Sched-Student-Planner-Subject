import { useState } from "react";
import ScheduleHeader from "../components/Schedule/ScheduleHeader";
import CalendarGrid from "../components/Schedule/CalendarGrid";
import AddScheduleModal from "../components/Schedule/AddScheduleModal";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper to generate mock events relative to current year/month
const generateInitialEvents = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1; // 1-indexed

  return {
    [`${y}-${m}-2`]:  [{ label: "Organic Chem ...", color: "bg-purple-100 text-purple-700" }],
    [`${y}-${m}-5`]:  [
      { label: "Thesis Outline", color: "bg-blue-500 text-white" },
      { label: "Reading: Plato", color: "bg-orange-200 text-orange-700" },
    ],
    [`${y}-${m}-11`]: [{ label: "Design Review", color: "bg-blue-500 text-white" }],
    [`${y}-${m}-13`]: [{ label: "Final Submission", color: "bg-red-400 text-white" }],
    [`${y}-${m}-17`]: [{ label: "Lab Work", color: "bg-purple-100 text-purple-700" }],
    [`${y}-${m}-25`]: [{ label: "Team Call", color: "bg-blue-100 text-blue-700" }],
  };
};

/**
 * Schedule Page
 * Composes the Schedule header and Calendar grid.
 * Scrollable layout, expanding wide to fit content.
 */
export default function Schedule() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState(generateInitialEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddEvent = (taskData) => {
    // Parse "YYYY-MM-DD" from input type="date"
    const [taskYear, taskMonth, taskDay] = taskData.date.split("-").map(Number);
    
    // Convert to "YYYY-M-D" to match eventKey format
    const key = `${taskYear}-${taskMonth}-${taskDay}`;

    // Map priority or subject to a color theme
    let color = "bg-blue-500 text-white"; // default
    if (taskData.priority === "High") color = "bg-red-400 text-white";
    if (taskData.priority === "Low") color = "bg-purple-100 text-purple-700";

    const newEvent = {
      label: taskData.taskName,
      color: color,
    };

    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newEvent],
    }));
  };

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      <AddScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddEvent}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <ScheduleHeader 
          monthLabel={monthLabel}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onAddTask={() => setIsModalOpen(true)}
        />
        <CalendarGrid year={year} month={month} events={events} />
        {/* Bottom breathing room */}
        <div className="h-6" />
      </div>
    </div>
  );
}
