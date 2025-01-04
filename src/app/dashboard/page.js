import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SignOutButton from "../components/SignOutButton";
import Authentication from "./Authentication";
import { syncUser } from "@/lib/db";
import StatsCard from "./components/StatsCard";
import TaskList from "./components/TaskList";
import prisma from "@/lib/prisma";
import './styles/page.css';
import AddTaskButton from './components/AddTaskButton';

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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {user.given_name || user.email}</h1>
        <SignOutButton />
      </header>

      <section className="stats-grid">
        <StatsCard 
          title="Open Tasks" 
          value={stats.totalOpen}
          description="Tasks waiting to be completed"
        />
        <StatsCard 
          title="Completed" 
          value={stats.completed}
          description="Tasks you've finished"
        />
        <StatsCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`}
          description="Your productivity score"
        />
      </section>

      <section className="tasks-section">
        <h2 className="tasks-title">Your Tasks</h2>
        <TaskList initialTasks={tasks} />
      </section>
      <AddTaskButton />
    </div>
  );
}
