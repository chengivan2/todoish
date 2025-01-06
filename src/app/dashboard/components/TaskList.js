'use client';
import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import './TaskList.css';

export default function TaskList({ initialTasks, onTaskClick }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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
    setEditTitle(task.title);
    setEditDescription(task.description);
    onTaskClick(task);
  };

  const closeOverlay = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
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
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                  className="edit-task-title-input"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit description"
                  className="edit-task-description-input"
                />
                <div className="task-buttons">
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={closeOverlay}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2>{selectedTask.title}</h2>
                <p>{selectedTask.description}</p>
                <div className="task-buttons">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={closeOverlay}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 