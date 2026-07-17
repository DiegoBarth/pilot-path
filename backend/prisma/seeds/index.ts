import { PrismaClient } from '@prisma/client';
import { seedCertifications } from './certifications.seed';
import { seedUsers } from './user.seed';
import { seedSubjects } from './subjects.seed';
import { seedCertificationSubjects } from './certification-subjects.seed';
import { seedStudySessions } from './study-sessions.seed';
import { seedFlashcards } from './flashcards.seed';
import { seedEnrollments } from './enrollments.seed';

export async function runSeeds(prisma: PrismaClient) {
  await seedCertifications(prisma);
  await seedUsers(prisma);
  await seedSubjects(prisma);
  await seedCertificationSubjects(prisma);
  await seedEnrollments(prisma);
  await seedStudySessions(prisma);
  await seedFlashcards(prisma);
}