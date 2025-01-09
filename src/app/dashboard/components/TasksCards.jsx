import { useEffect, useState } from 'react';
import './TasksCards.css';

export default function TasksCards() {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const deletedResponse = await fetch('/api/tasks/deleted');
        if (deletedResponse.ok) {
          const deletedData = await deletedResponse.json();
          setDeletedTasks(deletedData);
        }

        const tasksResponse = await fetch('/api/tasks');
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setCompletedTasks(tasksData.filter(task => task.completed).slice(0, 10));
          setIncompleteTasks(tasksData.filter(task => !task.completed).slice(0, 10));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  const handleRestore = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/restore`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setDeletedTasks(deletedTasks.filter(task => task.id !== taskId));
        // Optionally, refetch tasks to update the completed/incomplete lists
      } else {
        console.error('Failed to restore task');
      }
    } catch (error) {
      console.error('Error restoring task:', error);
    }
  };

  return (
    <div className="tasks-cards-section">
      <div className='not-deleted-tasks'>
      <div className="completed-tasks-card">
        <h3>Completed Tasks</h3>
        <div className="tasks-list">
          {completedTasks.map(task => (
            <div key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="incomplete-tasks-card">
        <h3>Incomplete Tasks</h3>
        <div className="tasks-list">
          {incompleteTasks.map(task => (
            <div key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className='deleted-tasks'>
      <div className="deleted-tasks-card">
        <h3>Deleted Tasks</h3>
        <div className="tasks-list">
          {deletedTasks.map(task => (
            <div key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
              <button className="restore-button" onClick={() => handleRestore(task.id)}>Restore</button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
