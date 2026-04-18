import React from "react";
import AnalyticsHeader from "../components/Analytics/AnalyticsHeader";
import StatCard from "../components/Analytics/StatCard";
import StudyHabitsChart from "../components/Analytics/StudyHabitsChart";
import SubjectDistribution from "../components/Analytics/SubjectDistribution";
import CompletionTrends from "../components/Analytics/CompletionTrends";
import FocusHistory from "../components/Analytics/FocusHistory";

export default function Analytics() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-[#11131a]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <AnalyticsHeader />

        {/* Row 1: Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Study Hours"
            value="124.5"
            percent="12"
            type="bars"
            bars={[40, 50, 60, 45, 100]}
          />
          <StatCard
            title="Tasks Completed"
            value="482"
            percent="5"
            type="bars"
            bars={[60, 40, 100, 30, 40]}
          />
          <StatCard
            title="Focus Streak"
            value="14"
            unit="days"
            type="line"
          />
          <StatCard
            title="Avg. Daily Focus"
            value="4.2"
            unit="hours"
            type="bars"
            bars={[40, 100, 50, 60]}
          />
        </div>

        {/* Row 2: Study Habits + Distribution */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[420px]">
          <div className="flex-[2] min-w-0">
            <StudyHabitsChart />
          </div>
          <div className="flex-[1] min-w-0">
            <SubjectDistribution />
          </div>
        </div>

        {/* Row 3: Trends + History */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 lg:h-[380px]">
          <div className="flex-[5.5] min-w-0">
            <CompletionTrends />
          </div>
          <div className="flex-[4.5] min-w-0">
            <FocusHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
