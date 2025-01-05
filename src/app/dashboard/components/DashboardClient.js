"use client";
import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import SignOutButton from "@/app/components/SignOutButton";
import "./DashboardClient.css";
import StatsCard from "./StatsCard";

export default function DashboardClient({ user, stats, tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeSidebar = () => {
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

      <section className="tasks-section">
        <h2 className="tasks-title">Your Tasks</h2>
        <TaskList initialTasks={tasks} onTaskClick={handleTaskClick} />
      </section>
      <AddTaskButton />

      {selectedTask && (
        <div className="task-sidebar">
          <div className="task-details">
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            <button onClick={closeSidebar}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
