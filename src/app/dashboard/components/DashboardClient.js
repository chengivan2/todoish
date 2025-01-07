"use client";
import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import SignOutButton from "@/app/components/SignOutButton";
import "./DashboardClient.css";
import StatsCard from "./StatsCard";

export default function DashboardClient({ user, stats, tasks }) {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Fetch last ten deleted tasks
    fetch("/api/tasks/deleted")
      .then(response => response.json())
      .then(data => setDeletedTasks(data.slice(0, 10)));

    // Fetch last ten incomplete tasks
    setIncompleteTasks(tasks.filter(task => !task.completed).slice(0, 10));

    // Fetch last ten completed tasks
    setCompletedTasks(tasks.filter(task => task.completed).slice(0, 10));
  }, [tasks]);

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
          buttonLabel="View Incomplete"
          buttonTarget="#incomplete-tasks"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          description="Tasks you've finished"
          buttonLabel="View Completed"
          buttonTarget="#completed-tasks"
        />
        <StatsCard
          title="Deleted"
          value={deletedTasks.length}
          description="Recently deleted tasks"
          buttonLabel="View Deleted"
          buttonTarget="#deleted-tasks"
        />
      </section>

      <section id="incomplete-tasks" className="tasks-section">
        <h2 className="tasks-title">Last 10 Incomplete Tasks</h2>
        <TaskList initialTasks={incompleteTasks} />
      </section>

      <section id="completed-tasks" className="tasks-section">
        <h2 className="tasks-title">Last 10 Completed Tasks</h2>
        <TaskList initialTasks={completedTasks} />
      </section>

      <section id="deleted-tasks" className="tasks-section">
        <h2 className="tasks-title">Last 10 Deleted Tasks</h2>
        <TaskList initialTasks={deletedTasks} />
      </section>

      <AddTaskButton />
    </div>
  );
}
