"use client";
import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import SignOutButton from "@/app/components/SignOutButton";
import "./DashboardClient.css";
import StatsCard from "./StatsCard";

export default function DashboardClient({ user, stats, tasks }) {
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
        <TaskList initialTasks={tasks} />
      </section>
      <AddTaskButton />
    </div>
  );
}
