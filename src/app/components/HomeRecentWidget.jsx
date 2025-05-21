import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import styles from "../homepage.module.css";

export default function HomeRecentWidget() {
  const [tasks, setTasks] = useState([]);
  const [completing, setCompleting] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        if (res.ok) {
          const all = await res.json();
          const incomplete = all.filter((t) => !t.completed)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
          setTasks(incomplete);
        }
      } catch (e) {
        // handle error
      }
    }
    fetchTasks();
  }, []);

  const handleComplete = async (task, idx) => {
    if (task.completed || completing[task.id]) return;
    setCompleting((prev) => ({ ...prev, [task.id]: true }));
    // Confetti burst at the top of the task
    const el = document.getElementById(`recent-task-${task.id}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + 10) / window.innerHeight,
        },
      });
    }
    try {
      await fetch(`/api/tasks/${task.id}/toggle`, { method: "PATCH" });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: true } : t
        )
      );
    } catch (e) {}
    setCompleting((prev) => ({ ...prev, [task.id]: false }));
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)",
      borderRadius: "1rem",
      padding: "1.5rem 1rem",
      boxShadow: "0 2px 8px hsla(0,0%,9%,0.2)",
      maxWidth: 420,
      margin: "0 auto",
      fontFamily: "Caveat, cursive",
    }}>
      <h3 style={{
        fontFamily: "Caveat, cursive",
        fontSize: "2rem",
        marginBottom: 16,
        color: "#fff",
        letterSpacing: 1,
      }}>
        Recent Tasks
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tasks.length === 0 ? (
          <li style={{ color: "#bbb", fontSize: "1.2rem", textAlign: "center" }}>No recent tasks!</li>
        ) : (
          tasks.map((task, idx) => (
            <li
              key={task.id}
              id={`recent-task-${task.id}`}
              onClick={() => handleComplete(task, idx)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0.7rem 0.5rem",
                marginBottom: 8,
                borderRadius: 8,
                background: task.completed ? "rgba(200,200,200,0.08)" : "rgba(255,255,255,0.03)",
                cursor: task.completed ? "default" : "pointer",
                opacity: task.completed ? 0.6 : 1,
                transition: "background 0.2s, opacity 0.2s",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#aaa" : "#fff",
                fontSize: "1.35rem",
                fontWeight: 500,
                position: "relative",
                userSelect: "none",
              }}
            >
              <span style={{
                width: 28,
                height: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #ffcc99",
                borderRadius: 8,
                background: task.completed ? "#e0e0e0" : "rgba(255,255,255,0.08)",
                marginRight: 12,
                transition: "background 0.2s, border 0.2s",
                color: task.completed ? "#bdbdbd" : "#ffcc99",
                fontSize: 20,
                fontWeight: 700,
              }}>
                {task.completed ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#bdbdbd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <span style={{ display: "block", width: 14, height: 14, borderRadius: 3, background: "#fff0", }}></span>
                )}
              </span>
              <span style={{ flex: 1 }}>{task.title}</span>
            </li>
          ))
        )}
      </ul>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
      `}</style>
    </div>
  );
}
