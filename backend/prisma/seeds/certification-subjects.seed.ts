import { PrismaClient } from '@prisma/client';

export async function seedCertificationSubjects(prisma: PrismaClient) {
  console.log('🌱 Seeding certification subjects...');

  const certifications =
    await prisma.certification.findMany({
      where: {
        slug: {
          in: [
            'private-pilot',
            'commercial-pilot'
          ]
        }
      }
    });

  const certificationBySlug = Object.fromEntries(
    certifications.map((certification) => [
      certification.slug,
      certification.id
    ])
  );

  const getCertificationId = (slug: string) => {
    const id = certificationBySlug[slug];

    if (!id) {
      throw new Error(`Certification ${slug} not found.`);
    }

    return id;
  };

  const subjects = await prisma.subject.findMany();

  const subjectBySlug = Object.fromEntries(
    subjects.map((subject) => [
      subject.slug,
      subject.id
    ])
  );

  const getSubjectId = (slug: string) => {
    const id = subjectBySlug[slug];

    if (!id) {
      throw new Error(`Subject ${slug} not found.`);
    }

    return id;
  };

  await prisma.certificationSubject.createMany({
    data: [
      // ========================================
      // PRIVATE PILOT (PP)
      // ========================================

      {
        certificationId: getCertificationId('private-pilot'),
        subjectId: getSubjectId('air-regulations'),
        displayOrder: 1,
        isRequired: true,
        estimatedHours: 20,
      },
      {
        certificationId: getCertificationId('private-pilot'),
        subjectId: getSubjectId('flight-theory'),
        displayOrder: 2,
        isRequired: true,
        estimatedHours: 30
      },
      {
        certificationId: getCertificationId('private-pilot'),
        subjectId: getSubjectId('air-navigation'),
        displayOrder: 3,
        isRequired: true,
        estimatedHours: 20
      },
      {
        certificationId: getCertificationId('private-pilot'),
        subjectId: getSubjectId('meteorology'),
        displayOrder: 4,
        isRequired: true,
        estimatedHours: 20
      },
      {
        certificationId: getCertificationId('private-pilot'),
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        displayOrder: 5,
        isRequired: true,
        estimatedHours: 30
      },

      // ========================================
      // COMMERCIAL PILOT (PC)
      // ========================================

      {
        certificationId: getCertificationId('commercial-pilot'),
        subjectId: getSubjectId('air-regulations'),
        displayOrder: 1,
        isRequired: true,
        estimatedHours: 30
      },
      {
        certificationId: getCertificationId('commercial-pilot'),
        subjectId: getSubjectId('flight-theory'),
        displayOrder: 2,
        isRequired: true,
        estimatedHours: 45
      },
      {
        certificationId: getCertificationId('commercial-pilot'),
        subjectId: getSubjectId('air-navigation'),
        displayOrder: 3,
        isRequired: true,
        estimatedHours: 45,
      },
      {
        certificationId: getCertificationId('commercial-pilot'),
        subjectId: getSubjectId('meteorology'),
        displayOrder: 4,
        isRequired: true,
        estimatedHours: 35
      },
      {
        certificationId: getCertificationId('commercial-pilot'),
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        displayOrder: 5,
        isRequired: true,
        estimatedHours: 40
      }
    ],
    skipDuplicates: true
  });

  console.log('✅ Certification subjects seeded');
}