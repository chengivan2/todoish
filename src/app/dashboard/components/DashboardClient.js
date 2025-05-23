"use client";
import React, { useState } from "react";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";
import "./DashboardClient.css";
import StatsCard from "./StatsCard";
import TasksCards from "./TasksCards";
import DashboardHeader from "./DashboardHeader";
import { TrashIcon } from "@radix-ui/react-icons";
import HomeRecentWidget from "../../components/HomeRecentWidget";

export default function DashboardClient({ user, stats, tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const closeSidebar = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setSelectedTask(updatedTask);
        setIsEditing(false);
        window.location.reload();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="dashboard" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridTemplateRows: "1fr auto", gap: "1rem", height: "100vh" }}>
      <div style={{ gridRow: "1 / span 2", gridColumn: "1 / 2" }}>
        <HomeRecentWidget />
      </div>
      <div style={{ gridRow: "1 / 2", gridColumn: "2 / 3", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        <StatsCard
          title="Open Tasks"
          value={stats.totalOpen}
          description="Tasks waiting to be completed"
          buttonLabel="Catch Up"
          buttonTarget="#incomplete-tasks-card"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          description="Tasks you've finished"
          buttonLabel="Review"
          buttonTarget="#completed-tasks-card"
        />
      </div>
      <div style={{ gridRow: "2 / 3", gridColumn: "2 / 3" }}>
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          description="Your productivity score"
          buttonLabel="View History"
          buttonTarget="#main-task-list"
        />
      </div>
      <section className="tasks-section">
        <h2 className="tasks-title">Your Tasks</h2>
        <TaskList
          id="main-task-list"
          initialTasks={tasks}
          onTaskClick={handleTaskClick}
        />
      </section>

      <section className="tasks-cards-section">
        <div className="tasks-cards-title">
          <h2>This is how we are doing</h2>
        </div>

        <div className="tasks-cards-container">
          <TasksCards onTaskClick={handleTaskClick} />
        </div>
      </section>

      <AddTaskButton />

      {selectedTask && (
        <div className="task-sidebar">
          <div className="task-details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit description"
                />
                <div className="task-buttons">
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={closeSidebar}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{selectedTask.title}</h2>
                <p>{selectedTask.description}</p>
                <div className="task-buttons">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={closeSidebar}>Close</button>
                  <button
                    className="icon-button trash"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(selectedTask.id);
                    }}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
