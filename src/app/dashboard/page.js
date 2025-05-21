import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Authentication from "./Authentication";
import { syncUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import DashboardClient from "./components/DashboardClient";

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
    <DashboardClient user={user} stats={stats} tasks={tasks} />
  );
}
