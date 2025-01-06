import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();
    const taskId = params.id;

    // Verify task ownership
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.user_id !== user.id) {
      return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
    }

    // Move task to DeletedTask table
    await prisma.deletedTask.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        created_at: task.created_at,
        deleted_at: new Date(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 30 days from now
        user_id: task.user_id,
      },
    });

    // Delete the task from the Task table
    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: 'Task moved to bin successfully' });
    
  } catch (error) {
    console.error('Failed to move task to deleted tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Update task
export async function PATCH(request, { params }) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();
    const taskId = params.id;
    const { title, description } = await request.json();

    // Verify task ownership
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.user_id !== user.id) {
      return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTask);
    
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 