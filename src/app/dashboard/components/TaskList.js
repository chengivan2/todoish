'use client';
import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import './TaskList.css';

export default function TaskList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeOverlay = () => {
    setSelectedTask(null);
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`task-item ${task.completed ? 'completed' : ''}`}
          onClick={() => handleTaskClick(task)}
        >
          <span className="task-title">{task.title}</span>
          <div className="task-actions">
            <button 
              className="task-done-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleToggleComplete(task.id);
              }}
              title={task.completed ? "Mark as not done" : "I'm done"}
            >
              {task.completed ? "Revisit" : "Done"}
            </button>
            <button 
              className="task-delete-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
              title="Delete task"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <div className="task-overlay" onClick={closeOverlay}>
          <div className="task-details" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 