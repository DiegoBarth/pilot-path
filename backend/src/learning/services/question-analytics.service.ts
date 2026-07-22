import { Injectable } from '@nestjs/common';
import { QuestionDifficulty } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { DifficultyPerformanceDto } from '../dto/difficulty-performance.dto';

@Injectable()
export class QuestionAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestionAccuracy(userId: string): Promise<number> {
    const [total, correct] = await Promise.all([
      this.prisma.userQuestion.count({ where: { userId } }),
      this.prisma.userQuestion.count({
        where: { userId, isCorrect: true },
      }),
    ]);

    if (total === 0) {
      return 0;
    }

    return Number(((correct / total) * 100).toFixed(2));
  }

  async getQuestionStatistics(userId: string) {
    const answers = await this.prisma.userQuestion.findMany({
      where: { userId },
      select: {
        isCorrect: true,
        question: {
          select: {
            difficulty: true,
          },
        },
      },
    });

    const totalAnswers = answers.length;
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const wrongAnswers = totalAnswers - correctAnswers;
    const accuracy =
      totalAnswers === 0
        ? 0
        : Number(((correctAnswers / totalAnswers) * 100).toFixed(2));

    const difficultyMap = new Map<
      QuestionDifficulty,
      {
        difficulty: QuestionDifficulty;
        totalAnswers: number;
        correctAnswers: number;
      }
    >();

    for (const answer of answers) {
      const difficulty = answer.question.difficulty;

      if (!difficultyMap.has(difficulty)) {
        difficultyMap.set(difficulty, {
          difficulty,
          totalAnswers: 0,
          correctAnswers: 0,
        });
      }

      const item = difficultyMap.get(difficulty)!;
      item.totalAnswers++;

      if (answer.isCorrect) {
        item.correctAnswers++;
      }
    }

    const performanceByDifficulty: DifficultyPerformanceDto[] = [
      ...difficultyMap.values(),
    ].map((item) => ({
      difficulty: item.difficulty,
      totalAnswers: item.totalAnswers,
      correctAnswers: item.correctAnswers,
      accuracy: Number(
        ((item.correctAnswers / item.totalAnswers) * 100).toFixed(2),
      ),
    }));

    return {
      totalAnswers,
      correctAnswers,
      wrongAnswers,
      accuracy,
      performanceByDifficulty,
    };
  }
}
