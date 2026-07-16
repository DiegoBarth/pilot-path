import { PrismaClient } from '@prisma/client';
import { seedCertifications } from './certifications.seed';
import { seedUsers } from './user.seed';
import { seedSubjects } from './subjects.seed';
import { seedCertificationSubjects } from './certification-subjects.seed';

export async function runSeeds(prisma: PrismaClient) {
  await seedCertifications(prisma);
  await seedUsers(prisma);
  await seedSubjects(prisma);
  await seedCertificationSubjects(prisma);
}