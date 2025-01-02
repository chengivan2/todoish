'use client';
import { useState } from 'react';
import './TaskList.css';

export default function TaskList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggleComplete = async (taskId) => {
    try {
      // Here we'll add the API call to update the task
      const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });
      
      if (response.ok) {
        setTasks(tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: !task.completed }
            : task
        ));
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {!task.completed && (
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              className="task-checkbox"
            />
          )}
          <span className="task-title">{task.title}</span>
        </div>
      ))}
    </div>
  );
} 