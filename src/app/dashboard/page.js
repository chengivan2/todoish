import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Authentication from "./Authentication";
import { syncUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import DashboardClient from "./components/DashboardClient";
import HomeRecentWidget from "../components/HomeRecentWidget";
import DashboardHeader from "./components/DashboardHeader";
import StatsCard from "./components/StatsCard";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";

async function getTaskStats(userId) {
  const tasks = await prisma.task.findMany({
    where: { user_id: userId }
  });
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return {
    totalOpen: totalTasks - completedTasks,
    completed: completedTasks,
    completionRate
  };
}

export default async function DashboardPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = authenticated ? await getUser() : null;
  
  if (!authenticated) {
    return <Authentication />;
  }

  try {
    await syncUser(user);
  } catch (error) {
    console.error('Failed to sync user:', error);
  }

  const stats = await getTaskStats(user.id);

  const tasks = await prisma.task.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(340px, 420px) 1fr",
      gap: "2.5rem",
      alignItems: "start",
      minHeight: "100vh",
      background: "none"
    }}>
      <div style={{height: "100vh", position: "sticky", top: 0, display: "flex", alignItems: "flex-start"}}>
        <HomeRecentWidget />
      </div>
      <div>
        <DashboardHeader />
        <section className="dashboard-welcome-message">
          <h2>Welcome back, {user.given_name || user.email}</h2>
        </section>
        <section className="stats-grid dashboard-stats-custom-grid" id="stats">
          <StatsCard
            title="Open Tasks"
            value={stats.totalOpen}
            description="Tasks waiting to be completed"
            buttonLabel="Catch Up"
            buttonTarget="#incomplete-tasks-card"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            description="Tasks you've finished"
            buttonLabel="Review"
            buttonTarget="#completed-tasks-card"
          />
          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            description="Your productivity score"
            buttonLabel="View History"
            buttonTarget="#main-task-list"
          />
        </section>
        <section className="tasks-section">
          <h2 className="tasks-title">Your Tasks</h2>
          <TaskList
            id="main-task-list"
            initialTasks={tasks}
            onTaskClick={handleTaskClick}
          />
        </section>
        <section className="tasks-cards-section">
          <div className="tasks-cards-title">
            <h2>This is how we are doing</h2>
          </div>
          <div className="tasks-cards-container">
            <TasksCards onTaskClick={handleTaskClick} />
          </div>
        </section>
        <AddTaskButton />
        {selectedTask && (
          <div className="task-sidebar">
            <div className="task-details">
              {/* ...existing code... */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
