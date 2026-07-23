import { PrismaClient, StudyType } from '@prisma/client';

export async function seedStudySessions(prisma: PrismaClient) {
  console.log('🌱 Seeding study sessions...');

  const enrollment = await prisma.enrollment.findFirst({
    include: {
      certification: true
    },
  });

  if (!enrollment) {
    throw new Error('Enrollment not found.');
  }

  const certificationSubjects = await prisma.certificationSubject.findMany({
    where: {
      certificationId: enrollment.certificationId
    },
    include: {
      subject: true
    },
    orderBy: {
      displayOrder: 'asc'
    }
  });

  const bySlug = Object.fromEntries(
    certificationSubjects.map((item) => [
      item.subject.slug,
      item.id
    ])
  );

  const getCertificationSubjectId = (slug: string) => {
    const id = bySlug[slug];

    if (!id) {
      throw new Error(`Certification subject ${slug} not found.`);
    }

    return id;
  };

  await prisma.studySession.createMany({
    data: [
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('air-regulations'),
        startedAt: new Date('2026-07-10T19:00:00Z'),
        endedAt: new Date('2026-07-10T20:30:00Z'),
        studyType: StudyType.READING,
        notes: 'Studied ICA regulations and pilot responsibilities.'
      },
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('flight-theory'),
        startedAt: new Date('2026-07-11T18:30:00Z'),
        endedAt: new Date('2026-07-11T20:00:00Z'),
        studyType: StudyType.VIDEO,
        notes: 'Watched videos about lift, drag and stalls.'
      },
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('air-navigation'),
        startedAt: new Date('2026-07-12T19:15:00Z'),
        endedAt: new Date('2026-07-12T20:45:00Z'),
        studyType: StudyType.EXERCISES,
        notes: 'Solved navigation exercises using E6B.'
      },
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('meteorology'),
        startedAt: new Date('2026-07-13T19:00:00Z'),
        endedAt: new Date('2026-07-13T20:00:00Z'),
        studyType: StudyType.FLASHCARDS,
        notes: 'Reviewed METAR, TAF and weather fronts.'
      },
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('aircraft-technical-knowledge'),
        startedAt: new Date('2026-07-14T18:45:00Z'),
        endedAt: new Date('2026-07-14T20:45:00Z'),
        studyType: StudyType.READING,
        notes: 'Studied piston engine systems and fuel system.'
      },
      {
        enrollmentId: enrollment.id,
        certificationSubjectId: getCertificationSubjectId('flight-theory'),
        startedAt: new Date('2026-07-15T19:30:00Z'),
        endedAt: new Date('2026-07-15T21:00:00Z'),
        studyType: StudyType.SIMULATOR,
        notes: 'Practiced straight and level flight in MSFS.'
      }
    ]
  });

  console.log('✅ Study sessions seeded');
}
