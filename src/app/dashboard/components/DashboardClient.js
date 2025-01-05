"use client";
import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import SignOutButton from "@/app/components/SignOutButton";

export default function DashboardClient({ user, stats, tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeOverlay = () => {
    setSelectedTask(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {user.given_name || user.email}</h1>
        <SignOutButton />
      </header>

      <section className="stats-grid">
        <StatsCard
          title="Open Tasks"
          value={stats.totalOpen}
          description="Tasks waiting to be completed"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          description="Tasks you've finished"
        />
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          description="Your productivity score"
        />
      </section>

      {selectedTask && (
        <div className="task-overlay" onClick={closeOverlay}>
          <div className="task-details" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}

      <section className="tasks-section">
        <h2 className="tasks-title">Your Tasks</h2>
        <TaskList initialTasks={tasks} onTaskClick={handleTaskClick} />
      </section>
      <AddTaskButton />
    </div>
  );
}
