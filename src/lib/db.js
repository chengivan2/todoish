import prisma from './prisma'

export async function syncUser(kindeUser) {
  if (!kindeUser) return null;
  
  try {
    const user = await prisma.user.upsert({
      where: {
        id: kindeUser.id,
      },
      update: {
        email: kindeUser.email,
        given_name: kindeUser.given_name ?? null,
        family_name: kindeUser.family_name ?? null,
      },
      create: {
        id: kindeUser.id,
        email: kindeUser.email,
        given_name: kindeUser.given_name ?? null,
        family_name: kindeUser.family_name ?? null,
      },
    });
    return user;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
} 