import { PrismaClient } from '@prisma/client';

export async function seedFlashcardReviews(prisma: PrismaClient) {
  console.log('🌱 Seeding flashcard reviews...');

  const user = await prisma.user.findUnique({
    where: {
      email: 'admin@pilotpath.com'
    }
  });

  if (!user) {
    throw new Error('Admin user not found.');
  }

  const flashcards = await prisma.flashcard.findMany({
    where: {
      isActive: true,
      deletedAt: null
    },
    take: 3
  });

  if (!flashcards.length) {
    throw new Error('No flashcards found.');
  }

  for (const [index, flashcard] of flashcards.entries()) {
    const userFlashcard = await prisma.userFlashcard.upsert({
      where: {
        userId_flashcardId: {
          userId: user.id,
          flashcardId: flashcard.id
        }
      },

      update: {
        correctCount: index + 1,
        wrongCount: index === 0 ? 1 : 0,
        lastReviewedAt: new Date(),
        nextReviewAt: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000)
      },

      create: {
        userId: user.id,
        flashcardId: flashcard.id,
        correctCount: index + 1,
        wrongCount: index === 0 ? 1 : 0,
        lastReviewedAt: new Date(),
        nextReviewAt: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000)
      }
    });

    await prisma.flashcardReview.createMany({
      data: [
        {
          userFlashcardId: userFlashcard.id,
          isCorrect: true,
          reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },

        ...(index === 0
          ? [
            {
              userFlashcardId: userFlashcard.id,
              isCorrect: false,
              reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
          ]
          : [])
      ]
    });
  }

  console.log('✅ Flashcard reviews seeded');
}