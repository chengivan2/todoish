import "./TasksCards.css";
import { useEffect, useState } from "react";

export default function DeletedTasks() {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    async function fetchDeletedTasks() {
      try {
        const response = await fetch("/api/tasks/deleted");
        if (response.ok) {
          const data = await response.json();
          setDeletedTasks(data);
        } else {
          console.error("Failed to fetch deleted tasks");
        }
      } catch (error) {
        console.error("Error fetching deleted tasks:", error);
      }
    }

    fetchDeletedTasks();
  }, []);

  return (
    <div className="tasks-cards-grid">
      <div className="deleted-tasks-card">
        <h3>Deleted Tasks</h3>
        <div className="deleted-tasks-list">
          {deletedTasks.map((task) => (
            <div key={task.id} className="deleted-task-item">
              <span className="task-title">{task.title}</span>
              <span className="task-date">
                {new Date(task.deleted_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="completed-tasks-card">
        <h3>Completed Tasks</h3>
        <p>View your completed tasks here</p>
      </div>

      <div className="pending-tasks-card">
        <h3>Pending Tasks</h3>
        <p>View your pending tasks here</p>
      </div>
    </div>
  );
}
