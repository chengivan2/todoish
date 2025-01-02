'use client';
import { useState } from 'react';
import './TaskList.css';

export default function TaskList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

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

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleComplete(task.id)}
            className="task-checkbox"
          />
          <span className="task-title">{task.title}</span>
        </div>
      ))}
    </div>
  );
} 