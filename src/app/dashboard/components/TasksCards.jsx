import { useEffect, useState } from "react";
import {
  CalendarIcon,
  CheckCircledIcon,
  CheckIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import "./TasksCards.css";

export default function TasksCards({ onTaskClick }) {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const deletedResponse = await fetch("/api/tasks/deleted");
        if (deletedResponse.ok) {
          const deletedData = await deletedResponse.json();
          setDeletedTasks(deletedData);
        }

        const tasksResponse = await fetch("/api/tasks");
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setCompletedTasks(
            tasksData.filter((task) => task.completed).slice(0, 10)
          );
          setIncompleteTasks(
            tasksData.filter((task) => !task.completed).slice(0, 10)
          );
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: "PATCH",
      });

      if (response.ok) {
        setIncompleteTasks(
          incompleteTasks.filter((task) => task.id !== taskId)
        );
        window.location.reload();
      } else {
        console.error("Failed to complete task");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIncompleteTasks(
          incompleteTasks.filter((task) => task.id !== taskId)
        );
        window.location.reload();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleRestore = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/restore`, {
        method: "PATCH",
      });

      if (response.ok) {
        setDeletedTasks(deletedTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to restore task");
      }
    } catch (error) {
      console.error("Error restoring task:", error);
    }
  };

  const handleRevisit = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: "PATCH",
      });

      if (response.ok) {
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
        window.location.reload();
      } else {
        console.error("Failed to revisit task");
      }
    } catch (error) {
      console.error("Error revisiting task:", error);
    }
  };

  const openTaskOverlay = (task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    onTaskClick(task);
  };

  return (
    <div className="tasks-cards-section">
      <div className="not-deleted-tasks">
        <div id="completed-tasks-card" className="completed-tasks-card">
          <h3>Completed Tasks</h3>
          <div className="tasks-list">
            {completedTasks.length === 0 ? (
              <div className="empty-message-container">
                <div className="empty-message-icon">
                  <CheckCircledIcon />
                </div>
                <p className="empty-message">
                  You haven't completed any tasks yet.
                </p>
              </div>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  onClick={() => openTaskOverlay(task)}
                >
                  <span className="task-title">{task.title}</span>
                  <div className="task-actions">
                    <button
                      className="icon-button revisit"
                      onClick={() => handleRevisit(task.id)}
                      title="Revisit"
                    >
                      Revisit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div id="incomplete-tasks-card" className="incomplete-tasks-card">
          <h3>Incomplete Tasks</h3>
          <div className="tasks-list">
            {incompleteTasks.length === 0 ? (
              <div className="empty-message-container">
                <div className="empty-message-icon">
                  <CalendarIcon />
                </div>
                <p className="empty-message">
                  You haven't added any tasks yet.
                </p>
              </div>
            ) : (
              incompleteTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  onClick={() => openTaskOverlay(task)}
                >
                  <span className="task-title">{task.title}</span>
                  <div className="task-actions">
                    <button
                      className="icon-button check"
                      onClick={() => handleComplete(task.id)}
                      title="I'm done"
                    >
                      <CheckIcon />
                    </button>
                    <button
                      className="icon-button trash"
                      onClick={() => handleDelete(task.id)}
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div id="deleted-tasks-card" className="deleted-tasks-card">
        <h3>Recently Deleted Tasks</h3>
        <div className="tasks-list">
          {deletedTasks.length === 0 ? (
            <div className="empty-message-container">
              <div className="empty-message-icon">
                <TrashIcon />
              </div>
              <p className="empty-message">
                You haven't deleted any tasks yet.
              </p>
            </div>
          ) : (
            deletedTasks.map((task) => (
              <div key={task.id} className="task-item">
                <span className="task-title">{task.title}</span>
                <button
                  className="restore-button"
                  onClick={() => handleRestore(task.id)}
                >
                  Restore
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
