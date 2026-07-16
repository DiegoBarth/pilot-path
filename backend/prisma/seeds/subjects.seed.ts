import { PrismaClient } from '@prisma/client';

export async function seedSubjects(prisma: PrismaClient) {
  console.log('🌱 Seeding subjects...');

  await prisma.subject.createMany({
    data: [
      {
        name: 'Air Regulations',
        slug: 'air-regulations',
        description: 'Brazilian aviation regulations and operational rules.'
      },
      {
        name: 'Flight Theory',
        slug: 'flight-theory',
        description: 'Fundamentals of aerodynamics and aircraft performance.'
      },
      {
        name: 'Air Navigation',
        slug: 'air-navigation',
        description: 'Principles of visual and radio navigation.'
      },
      {
        name: 'Meteorology',
        slug: 'meteorology',
        description: 'Weather phenomena and aviation meteorology.'
      },
      {
        name: 'Aircraft Technical Knowledge',
        slug: 'aircraft-technical-knowledge',
        description: 'Aircraft systems, engines and technical operations.'
      },
    ],
    skipDuplicates: true
  });

  console.log('✅ Subjects seeded');
}