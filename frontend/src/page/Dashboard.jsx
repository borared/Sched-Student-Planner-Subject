import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DailyProgress from "../components/dashboard/DailyProgress";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import FocusTimer from "../components/dashboard/FocusTimer";
import AddScheduleModal from "../components/Schedule/AddScheduleModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (taskData) => {
    // Generate some tags out of the subject and time
    const newTags = [
      { label: taskData.subject, style: "bg-purple-100 text-purple-600" }
    ];
    
    // Add time difference as a tag if start and end exist
    if (taskData.startTime && taskData.endTime) {
      newTags.push({ label: `${taskData.startTime} - ${taskData.endTime}`, style: "bg-gray-100 text-gray-500" });
    } else {
      newTags.push({ label: taskData.priority, style: taskData.priority === "High" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600" });
    }

    const newTask = {
      id: Date.now(),
      title: taskData.taskName,
      completed: false,
      tags: newTags,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  // Derived counts — always in sync with task state
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-white relative">
      <AddScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddTask}
      />

      {/* Header */}
      <DashboardHeader name="Bora" onAddTask={() => setIsModalOpen(true)} />

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
