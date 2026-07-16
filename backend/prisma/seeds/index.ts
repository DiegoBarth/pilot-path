import { PrismaClient } from '@prisma/client';
import { seedCertifications } from './certifications.seed';
import { seedUsers } from './user.seed';

export async function runSeeds(prisma: PrismaClient) {
  await seedCertifications(prisma);
  await seedUsers(prisma);
}