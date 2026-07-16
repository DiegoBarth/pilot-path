import { PrismaClient } from '@prisma/client';

export async function seedCertificationSubjects(prisma: PrismaClient) {
  console.log('🌱 Seeding certification subjects...');

  const certification = await prisma.certification.findUnique({
    where: {
      slug: 'private-pilot'
    }
  });

  if (!certification) {
    throw new Error('Private Pilot certification not found.');
  }

  const subjects = await prisma.subject.findMany();

  const bySlug = Object.fromEntries(
    subjects.map(subject => [subject.slug, subject.id]),
  );

  const getSubjectId = (slug: string) => {
    const id = bySlug[slug];

    if (!id) {
      throw new Error(`Subject ${slug} not found.`);
    }

    return id;
  };

  await prisma.certificationSubject.createMany({
    data: [
      {
        certificationId: certification.id,
        subjectId: getSubjectId('air-regulations'),
        displayOrder: 1,
        isRequired: true,
        estimatedHours: 20
      },
      {
        certificationId: certification.id,
        subjectId: getSubjectId('flight-theory'),
        displayOrder: 2,
        isRequired: true,
        estimatedHours: 30
      },
      {
        certificationId: certification.id,
        subjectId: getSubjectId('air-navigation'),
        displayOrder: 3,
        isRequired: true,
        estimatedHours: 20
      },
      {
        certificationId: certification.id,
        subjectId: getSubjectId('meteorology'),
        displayOrder: 4,
        isRequired: true,
        estimatedHours: 20
      },
      {
        certificationId: certification.id,
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        displayOrder: 5,
        isRequired: true,
        estimatedHours: 30
      },
    ],
    skipDuplicates: true
  });

  console.log('✅ Certification subjects seeded');
}