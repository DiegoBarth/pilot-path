import { PrismaClient } from '@prisma/client';
import { seedCertifications } from './certifications.seed';

export async function runSeeds(prisma: PrismaClient) {
  await seedCertifications(prisma);
}