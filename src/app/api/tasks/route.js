import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' }, 
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        user_id: user.id,
      },
    });

    return NextResponse.json(task);
    
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Get all tasks for the authenticated user
export async function GET() {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();

    const tasks = await prisma.task.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(tasks);
    
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 