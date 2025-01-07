import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();
    
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUser();

    // Fetch the last ten deleted tasks for the authenticated user
    const deletedTasks = await prisma.deletedTask.findMany({
      where: { user_id: user.id },
      orderBy: { deleted_at: 'desc' },
      take: 10,
    });

    return NextResponse.json(deletedTasks);
    
  } catch (error) {
    console.error('Failed to fetch deleted tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 