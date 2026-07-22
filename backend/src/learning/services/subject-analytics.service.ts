import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubjectPerformanceDto } from '../dto/subject-performance.dto';
import { WeakSubjectDto } from '../dto/weak-subject.dto';
import { SubjectAnalyticsDto } from '../dto/subject-analytics.dto';

@Injectable()
export class SubjectAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubjectPerformance(
    userId: string,
  ): Promise<SubjectPerformanceDto[]> {
    const answers = await this.prisma.userQuestion.findMany({
      where: { userId },
      select: {
        isCorrect: true,
        question: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const subjects = new Map<
      string,
      {
        subjectId: string;
        subjectName: string;
        total: number;
        correct: number;
      }
    >();

    for (const answer of answers) {
      const { id, name } = answer.question.subject;

      if (!subjects.has(id)) {
        subjects.set(id, {
          subjectId: id,
          subjectName: name,
          total: 0,
          correct: 0,
        });
      }

      const subject = subjects.get(id)!;
      subject.total++;

      if (answer.isCorrect) {
        subject.correct++;
      }
    }

    return [...subjects.values()]
      .map((subject) => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        totalAnswers: subject.total,
        accuracy: Number(
          ((subject.correct / subject.total) * 100).toFixed(2),
        ),
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
  }

  async getWeakSubjects(userId: string): Promise<WeakSubjectDto[]> {
    const performance = await this.getSubjectPerformance(userId);

    return performance
      .filter((subject) => subject.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((subject) => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        accuracy: subject.accuracy,
      }));
  }

  async getSubjectAnalytics(userId: string) {
    const questions = await this.prisma.userQuestion.findMany({
      where: { userId },
      select: {
        isCorrect: true,
        question: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const flashcards = await this.prisma.flashcardReview.findMany({
      where: {
        userFlashcard: { userId },
      },
      select: {
        isCorrect: true,
        userFlashcard: {
          select: {
            flashcard: {
              select: {
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const subjects = new Map<
      string,
      {
        subjectId: string;
        subjectName: string;
        questionsAnswered: number;
        correctQuestions: number;
        flashcardsReviewed: number;
        correctFlashcards: number;
      }
    >();

    for (const answer of questions) {
      const { id, name } = answer.question.subject;

      if (!subjects.has(id)) {
        subjects.set(id, {
          subjectId: id,
          subjectName: name,
          questionsAnswered: 0,
          correctQuestions: 0,
          flashcardsReviewed: 0,
          correctFlashcards: 0,
        });
      }

      const subject = subjects.get(id)!;
      subject.questionsAnswered++;

      if (answer.isCorrect) {
        subject.correctQuestions++;
      }
    }

    for (const review of flashcards) {
      const { id, name } = review.userFlashcard.flashcard.subject;

      if (!subjects.has(id)) {
        subjects.set(id, {
          subjectId: id,
          subjectName: name,
          questionsAnswered: 0,
          correctQuestions: 0,
          flashcardsReviewed: 0,
          correctFlashcards: 0,
        });
      }

      const subject = subjects.get(id)!;
      subject.flashcardsReviewed++;

      if (review.isCorrect) {
        subject.correctFlashcards++;
      }
    }

    const analytics: SubjectAnalyticsDto[] = [...subjects.values()]
      .map((subject) => {
        const questionAccuracy =
          subject.questionsAnswered === 0
            ? 0
            : Number(
                (
                  (subject.correctQuestions / subject.questionsAnswered) *
                  100
                ).toFixed(2),
              );

        const flashcardAccuracy =
          subject.flashcardsReviewed === 0
            ? 0
            : Number(
                (
                  (subject.correctFlashcards / subject.flashcardsReviewed) *
                  100
                ).toFixed(2),
              );

        const totalAnswers =
          subject.questionsAnswered + subject.flashcardsReviewed;
        const totalCorrect =
          subject.correctQuestions + subject.correctFlashcards;
        const overallAccuracy =
          totalAnswers === 0
            ? 0
            : Number(((totalCorrect / totalAnswers) * 100).toFixed(2));

        return {
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          questionAccuracy,
          questionsAnswered: subject.questionsAnswered,
          flashcardAccuracy,
          flashcardsReviewed: subject.flashcardsReviewed,
          overallAccuracy,
        };
      })
      .sort((a, b) => b.overallAccuracy - a.overallAccuracy);

    const weakSubjects: WeakSubjectDto[] = analytics
      .filter(
        (subject) =>
          subject.questionsAnswered > 0 || subject.flashcardsReviewed > 0,
      )
      .sort((a, b) => a.overallAccuracy - b.overallAccuracy)
      .slice(0, 5)
      .map((subject) => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        accuracy: subject.overallAccuracy,
      }));

    return {
      subjects: analytics,
      weakSubjects,
    };
  }
}
