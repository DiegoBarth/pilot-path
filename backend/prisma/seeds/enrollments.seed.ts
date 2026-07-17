import { EnrollmentStatus, PrismaClient } from '@prisma/client';

export async function seedEnrollments(prisma: PrismaClient) {
  console.log('🌱 Seeding enrollments...');

  const user = await prisma.user.findUnique({
    where: {
      email: 'admin@pilotpath.com'
    },
  });

  if (!user) {
    throw new Error('Admin user not found.');
  }

  const certification = await prisma.certification.findUnique({
    where: {
      slug: 'private-pilot'
    },
  });

  if (!certification) {
    throw new Error('Private Pilot certification not found.');
  }

  await prisma.enrollment.createMany({
    data: [
      {
        userId: user.id,
        certificationId: certification.id,
        status: EnrollmentStatus.ACTIVE,
        startedAt: new Date()
      }
    ],
    skipDuplicates: true
  });

  console.log('✅ Enrollments seeded');
}