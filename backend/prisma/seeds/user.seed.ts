import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {

  const password =
    await bcrypt.hash(
      'Password123!',
      10
    );

  console.log('🌱 Seeding users...');

  await prisma.user.upsert({
    where: {
      email: 'admin@pilotpath.com',
    },

    update: {},

    create: {
      name: 'PilotPath Admin',
      email: 'admin@pilotpath.com',
      password,
    },

  });

  console.log('✅ Users seeded');

}