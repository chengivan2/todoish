import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();
    const taskId = params.id;

    // Verify task ownership in the deleted tasks
    const deletedTask = await prisma.deletedTask.findUnique({
      where: { id: taskId },
    });

    if (!deletedTask || deletedTask.user_id !== user.id) {
      return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
    }

    // Restore the task to the Task table
    await prisma.task.create({
      data: {
        id: deletedTask.id,
        title: deletedTask.title,
        description: deletedTask.description,
        completed: deletedTask.completed,
        created_at: deletedTask.created_at,
        user_id: deletedTask.user_id,
      },
    });

    // Delete the task from the DeletedTask table
    await prisma.deletedTask.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: 'Task restored successfully' });
    
  } catch (error) {
    console.error('Failed to restore task:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 