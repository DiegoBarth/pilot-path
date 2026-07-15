import { PrismaClient } from '@prisma/client';

export async function seedCertifications(prisma: PrismaClient) {
  console.log('🌱 Seeding certifications...');

  await prisma.certification.createMany({
    data: [
      {
        name: 'Private Pilot (PP)',
        slug: 'private-pilot',
      },
      {
        name: 'Commercial Pilot (PC)',
        slug: 'commercial-pilot',
      },
      {
        name: 'Instrument Rating (IFR)',
        slug: 'instrument-rating',
      },
      {
        name: 'Multi Engine (MLTE)',
        slug: 'multi-engine',
      },
      {
        name: 'Flight Instructor (INVA)',
        slug: 'flight-instructor',
      },
      {
        name: 'Airline Transport Pilot (PLA)',
        slug: 'airline-transport-pilot',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Certifications seeded');
}