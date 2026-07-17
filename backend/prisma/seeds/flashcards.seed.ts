import { PrismaClient } from '@prisma/client';

export async function seedFlashcards(prisma: PrismaClient) {
  console.log('🌱 Seeding flashcards...');

  const subjects = await prisma.subject.findMany();

  const bySlug = Object.fromEntries(
    subjects.map(subject => [subject.slug, subject.id]),
  );

  const getSubjectId = (slug: string) => {
    const id = bySlug[slug];

    if (!id) {
      throw new Error(`Certification subject ${slug} not found.`);
    }

    return id;
  };

  await prisma.flashcard.createMany({
    data: [
      // Air Regulations
      {
        subjectId: getSubjectId('air-regulations'),
        question: 'What does ANAC stand for?',
        answer: 'National Civil Aviation Agency of Brazil.'
      },
      {
        subjectId: getSubjectId('air-regulations'),
        question: 'What is RBAC?',
        answer: 'Brazilian Civil Aviation Regulation.'
      },
      {
        subjectId: getSubjectId('air-regulations'),
        question: 'Who is responsible for air traffic control in Brazil?',
        answer: 'DECEA.'
      },

      // Flight Theory
      {
        subjectId: getSubjectId('flight-theory'),
        question: 'What are the four fundamental forces acting on an aircraft?',
        answer: 'Lift, Weight, Thrust and Drag.'
      },
      {
        subjectId: getSubjectId('flight-theory'),
        question: 'What causes an aerodynamic stall?',
        answer: 'Exceeding the critical angle of attack.'
      },
      {
        subjectId: getSubjectId('flight-theory'),
        question: 'What does IAS mean?',
        answer: 'Indicated Airspeed.'
      },

      // Air Navigation
      {
        subjectId: getSubjectId('air-navigation'),
        question: 'What is true north?',
        answer: 'The geographic North Pole.'
      },
      {
        subjectId: getSubjectId('air-navigation'),
        question: 'What is magnetic variation?',
        answer: 'The angle between true north and magnetic north.'
      },
      {
        subjectId: getSubjectId('air-navigation'),
        question: 'What does VOR stand for?',
        answer: 'VHF Omnidirectional Range.'
      },

      // Meteorology
      {
        subjectId: getSubjectId('meteorology'),
        question: 'What does METAR represent?',
        answer: 'Routine aerodrome weather report.'
      },
      {
        subjectId: getSubjectId('meteorology'),
        question: 'What does TAF represent?',
        answer: 'Terminal Aerodrome Forecast.'
      },
      {
        subjectId: getSubjectId('meteorology'),
        question: 'Which cloud type is commonly associated with thunderstorms?',
        answer: 'Cumulonimbus.'
      },

      // Aircraft Technical Knowledge
      {
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        question: 'What powers the electrical system after engine start?',
        answer: 'The alternator.'
      },
      {
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        question: 'What is the primary purpose of the pitot tube?',
        answer: 'Measure ram air pressure for the airspeed indicator.'
      },
      {
        subjectId: getSubjectId('aircraft-technical-knowledge'),
        question: 'What instrument indicates the aircraft altitude?',
        answer: 'Altimeter.'
      },
    ],
    skipDuplicates: true
  });

  console.log('✅ Flashcards seeded');
}