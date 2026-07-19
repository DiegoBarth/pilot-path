import { PrismaClient } from '@prisma/client';

export async function seedMockExams(prisma: PrismaClient) {
  console.log('🌱 Seeding mock exams...');

  const user = await prisma.user.findFirst({
    where: {
      email: 'admin@pilotpath.com'
    }
  });

  if (!user) {
    console.log('⚠️ Admin user not found. Skipping mock exams.');
    return;
  }

  const subject = await prisma.subject.findFirst({
    where: {
      slug: 'flight-theory'
    }
  });

  if (!subject) {
    console.log('⚠️ Flight Theory subject not found. Skipping mock exams.');
    return;
  }

  const questions = await prisma.question.findMany({
    where: {
      subjectId: subject.id
    },
    take: 5
  });

  if (questions.length < 2) {
    console.log('⚠️ Not enough questions to create mock exam.');
    return;
  }

  const existingExam = await prisma.mockExam.findFirst({
    where: {
      userId: user.id,
      subjectId: subject.id
    }
  });

  if (existingExam) {
    console.log('ℹ️ Mock exam already exists.');
    return;
  }

  await prisma.mockExam.create({
    data: {
      userId: user.id,
      subjectId: subject.id,

      totalQuestions: questions.length,

      questions: {
        create: questions.map((question, index) => ({
          questionId: question.id,
          displayOrder: index + 1
        }))
      }
    }
  });

  console.log('✅ Mock exams seeded');
}