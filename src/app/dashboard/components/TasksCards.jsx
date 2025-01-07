import "./TasksCards.css";

export default function TasksCards() {
  return (
    <>
      <div className="deleted-tasks-card">
        <h3>Deleted Tasks</h3>
        <p>View your deleted tasks here</p>
      </div>

      <div className="completed-tasks-card">
        <h3>Completed Tasks</h3>
        <p>View your completed tasks here</p>
      </div>

      <div className="pending-tasks-card">
        <h3>Pending Tasks</h3>
        <p>View your pending tasks here</p>
      </div>
    </>
  );
}
