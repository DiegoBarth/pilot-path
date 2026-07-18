import { PrismaClient } from '@prisma/client';

export async function seedQuestionPractice(prisma: PrismaClient) {
  console.log('🌱 Seeding question practice...');

  const user = await prisma.user.findFirst({
    where: {
      email: 'admin@pilotpath.com'
    }
  });

  if (!user) {
    throw new Error('Admin user not found.');
  }

  const questions = await prisma.question.findMany({
    include: {
      alternatives: true
    },

    take: 5
  });

  if (!questions.length) {
    throw new Error('Questions not found.');
  }

  const answers = questions.map(
    (question, index) => {
      const correctAlternative =
        question.alternatives.find(
          alternative => alternative.isCorrect
        );

      if (!correctAlternative) {
        throw new Error(`Correct alternative not found for question ${question.id}`);
      }

      const firstAlternative = question.alternatives[0];

      if (!firstAlternative) {
        throw new Error(
          `No alternatives found for question ${question.id}`,
        );
      }

      return {
        userId: user.id,
        questionId: question.id,
        selectedAlternativeId: index % 2 === 0 ? correctAlternative.id : firstAlternative.id,
        isCorrect: index % 2 === 0,
        responseTime: 15 + index * 5,
        answeredAt: new Date(Date.now() - index * 86400000)
      };
    }
  );

  await prisma.userQuestion.createMany({
    data: answers,
    skipDuplicates: true
  });

  console.log('✅ Question practice seeded');

}