import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DailyProgress from "../components/dashboard/DailyProgress";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import FocusTimer from "../components/dashboard/FocusTimer";

// Tasks state lives here so DailyProgress always reflects the real count
const initialTasks = [
  {
    id: 1,
    title: "Chapter 4: Advanced Neurobiology",
    completed: false,
    tags: [
      { label: "Science", style: "bg-purple-100 text-purple-600" },
      { label: "45 Mins", style: "bg-gray-100 text-gray-500" },
    ],
  },
  {
    id: 2,
    title: "Outline Dissertation Proposal",
    completed: false,
    tags: [
      { label: "Writing", style: "bg-blue-100 text-blue-600" },
      { label: "Done", style: "bg-green-100 text-green-600" },
    ],
  },
  {
    id: 3,
    title: "Weekly Math Problem Set #9",
    completed: false,
    tags: [
      { label: "Mathematics", style: "bg-orange-100 text-orange-600" },
      { label: "90 Mins", style: "bg-gray-100 text-gray-500" },
    ],
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Derived counts — always in sync with task state
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-white">
      {/* Header */}
      <DashboardHeader name="Bora" />

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* ── Left Column ── */}
        <div className="flex-1 min-w-0">
          <DailyProgress completed={completedCount} total={totalCount} />
          <TodaysTasks tasks={tasks} onToggle={handleToggle} />
        </div>

        {/* ── Right Column ── */}
        <div className="w-72 shrink-0">
          <UpcomingTasks />
          <FocusTimer />
        </div>
      </div>
    </main>
  );
}
