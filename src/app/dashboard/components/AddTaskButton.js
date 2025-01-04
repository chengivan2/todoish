"use client";
import { useState, useEffect } from "react";
import "./AddTaskButton.css";

export default function AddTaskButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          description,
          createdAt: userTimestamp,
        }),
      });

      if (response.ok) {
        setNewTask("");
        setDescription("");
        setShowForm(false);

        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <>
      <button
        className={`add-task-button ${isScrolled ? "scrolled" : ""}`}
        onClick={() => setShowForm(true)}
      >
        <span className="plus-icon">+</span>
        <span className="button-text">Add Task</span>
      </button>

      {showForm && (
        <div className="task-form-overlay" onClick={() => setShowForm(false)}>
          <form
            className="task-form"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task"
            />
            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit">Add Task</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
