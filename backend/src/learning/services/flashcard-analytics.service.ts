import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FlashcardAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFlashcardAccuracy(userId: string): Promise<number> {
    const result = await this.prisma.userFlashcard.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _sum: {
        correctCount: true,
        wrongCount: true,
      },
    });

    const correct = result._sum.correctCount ?? 0;
    const wrong = result._sum.wrongCount ?? 0;
    const total = correct + wrong;

    if (total === 0) {
      return 0;
    }

    return Number(((correct / total) * 100).toFixed(2));
  }

  async getFlashcardStatistics(userId: string) {
    const reviews = await this.prisma.flashcardReview.findMany({
      where: {
        userFlashcard: {
          userId,
        },
      },
      orderBy: {
        reviewedAt: 'asc',
      },
      select: {
        isCorrect: true,
        reviewedAt: true,
      },
    });

    const totalReviews = reviews.length;
    const correctAnswers = reviews.filter((review) => review.isCorrect).length;
    const wrongAnswers = totalReviews - correctAnswers;
    const accuracy =
      totalReviews === 0
        ? 0
        : Number(((correctAnswers / totalReviews) * 100).toFixed(2));

    const history = new Map<string, { period: string; reviews: number }>();

    for (const review of reviews) {
      const period = review.reviewedAt.toISOString().slice(0, 7);

      if (!history.has(period)) {
        history.set(period, { period, reviews: 0 });
      }

      history.get(period)!.reviews++;
    }

    return {
      totalReviews,
      correctAnswers,
      wrongAnswers,
      accuracy,
      reviewHistory: [...history.values()],
    };
  }
}
