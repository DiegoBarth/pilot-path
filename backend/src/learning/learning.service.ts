import { Injectable } from "@nestjs/common";
import { SubjectPerformanceDto } from "./dto/subject-performance.dto";
import { WeakSubjectDto } from "./dto/weak-subject.dto";
import { PrismaService } from "../database/prisma.service";
import { LearningStatisticsDto } from "./dto/learning-statistics.dto";
import { PerformanceTrendDto } from "./dto/performance-trend.dto";
import { FlashcardPerformanceDto } from "./dto/flashcard-performance.dto";
import { DifficultyPerformanceDto } from "./dto/difficulty-performance.dto";
import { QuestionDifficulty } from "@prisma/client";
import { QuestionPerformanceDto } from "./dto/question-performance.dto";
import { MockExamPerformanceDto } from "./dto/mock-exam-performance.dto";

@Injectable()
export class LearningStatisticsService {

  constructor(private readonly prisma: PrismaService) { }

  async getStatistics(userId: string): Promise<LearningStatisticsDto> {
    const [
      flashcardAccuracy,
      questionAccuracy,
      mockExamPerformance,
      subjectPerformance,
      weakSubjects,
      performanceTrends,
    ] = await Promise.all([
      this.getFlashcardAccuracy(userId),
      this.getQuestionAccuracy(userId),
      this.getMockExamPerformance(userId),
      this.getSubjectPerformance(userId),
      this.getWeakSubjects(userId),
      this.getPerformanceTrend(userId)
    ]);

    return {
      flashcardAccuracy,
      questionAccuracy,
      mockExamPerformance,
      subjectPerformance,
      weakSubjects,
      performanceTrends
    };
  }

  async getFlashcardAccuracy(userId: string): Promise<number> {
    const result = await this.prisma.userFlashcard.aggregate({
      where: {
        userId,
        deletedAt: null
      },
      _sum: {
        correctCount: true,
        wrongCount: true
      }
    });

    const correct = result._sum.correctCount ?? 0;
    const wrong = result._sum.wrongCount ?? 0;
    const total = correct + wrong;

    if (total === 0) {
      return 0;
    }

    return Number(((correct / total) * 100).toFixed(2));
  }

  private async getQuestionAccuracy(userId: string): Promise<number> {
    const [total, correct] = await Promise.all([
      this.prisma.userQuestion.count({
        where: {
          userId
        }
      }),

      this.prisma.userQuestion.count({
        where: {
          userId,
          isCorrect: true
        }
      })
    ]);

    if (total === 0) {
      return 0;
    }

    return Number(((correct / total) * 100).toFixed(2));
  }

  private async getMockExamPerformance(userId: string): Promise<number> {
    const result = await this.prisma.mockExam.aggregate({
      where: {
        userId,
        deletedAt: null,
        finishedAt: {
          not: null
        }
      },
      _avg: {
        score: true
      }
    });

    return Number((result._avg.score ?? 0).toFixed(2));
  }

  private async getSubjectPerformance(
    userId: string,
  ): Promise<SubjectPerformanceDto[]> {
    const answers = await this.prisma.userQuestion.findMany({
      where: {
        userId
      },
      select: {
        isCorrect: true,
        question: {
          select: {
            subject: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
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
          correct: 0
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
        )
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
  }

  private async getWeakSubjects(userId: string): Promise<WeakSubjectDto[]> {
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

  private async getPerformanceTrend(userId: string): Promise<PerformanceTrendDto[]> {
    const exams = await this.prisma.mockExam.findMany({
      where: {
        userId,
        deletedAt: null,
        finishedAt: {
          not: null
        }
      },
      orderBy: {
        finishedAt: 'asc'
      },
      select: {
        finishedAt: true,
        score: true
      }
    });

    return exams.map((exam) => ({
      period: exam.finishedAt!.toISOString().slice(0, 7),
      accuracy: exam.score
    }));
  }

  async getFlashcardStatistics(userId: string): Promise<FlashcardPerformanceDto> {
    const reviews = await this.prisma.flashcardReview.findMany({
      where: {
        userFlashcard: {
          userId
        }
      },
      orderBy: {
        reviewedAt: 'asc'
      },
      select: {
        isCorrect: true,
        reviewedAt: true
      }
    });

    const totalReviews = reviews.length;

    const correctAnswers = reviews.filter((review) => review.isCorrect).length;

    const wrongAnswers = totalReviews - correctAnswers;

    const accuracy = totalReviews === 0 ? 0 : Number(((correctAnswers / totalReviews) * 100).toFixed(2));

    const history = new Map<
      string,
      {
        period: string;
        reviews: number;
      }
    >();

    for (const review of reviews) {
      const period = review.reviewedAt.toISOString().slice(0, 7);

      if (!history.has(period)) {
        history.set(period, {
          period,
          reviews: 0
        });
      }

      history.get(period)!.reviews++;
    }

    return {
      totalReviews,
      correctAnswers,
      wrongAnswers,
      accuracy,
      reviewHistory: [...history.values()]
    };
  }

  async getQuestionStatistics(userId: string): Promise<QuestionPerformanceDto> {
    const answers = await this.prisma.userQuestion.findMany({
      where: {
        userId
      },
      select: {
        isCorrect: true,
        question: {
          select: {
            difficulty: true
          }
        }
      }
    });

    const totalAnswers = answers.length;

    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;

    const wrongAnswers = totalAnswers - correctAnswers;

    const accuracy = totalAnswers === 0
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
          correctAnswers: 0
        });
      }

      const item = difficultyMap.get(difficulty)!;

      item.totalAnswers++;

      if (answer.isCorrect) {
        item.correctAnswers++;
      }
    }

    const performanceByDifficulty: DifficultyPerformanceDto[] =
      [...difficultyMap.values()].map((item) => ({
        difficulty: item.difficulty,
        totalAnswers: item.totalAnswers,
        correctAnswers: item.correctAnswers,
        accuracy: Number(
          (
            (item.correctAnswers / item.totalAnswers) *
            100
          ).toFixed(2),
        )
      }));

    return {
      totalAnswers,
      correctAnswers,
      wrongAnswers,
      accuracy,
      performanceByDifficulty
    };
  }

  async getMockExamStatistics(userId: string): Promise<MockExamPerformanceDto> {
    const exams = await this.prisma.mockExam.findMany({
      where: {
        userId,
        deletedAt: null,
        finishedAt: {
          not: null
        }
      },
      orderBy: {
        finishedAt: 'asc'
      },
      select: {
        score: true,
        passed: true,
        finishedAt: true
      }
    });

    const completedExams = exams.length;

    if (completedExams === 0) {
      return {
        completedExams: 0,
        averageScore: 0,
        approvalRate: 0,
        bestResult: 0,
        worstResult: 0,
        scoreHistory: []
      };
    }

    const totalScore = exams.reduce((sum, exam) => sum + exam.score, 0);

    const averageScore = Number((totalScore / completedExams).toFixed(2));

    const approvedExams = exams.filter((exam) => exam.passed).length;

    const approvalRate = Number(((approvedExams / completedExams) * 100).toFixed(2));

    const bestResult = Math.max(...exams.map((exam) => exam.score));

    const worstResult = Math.min(...exams.map((exam) => exam.score));

    const history = new Map<
      string,
      {
        totalScore: number;
        totalExams: number;
      }
    >();

    for (const exam of exams) {
      const period = exam.finishedAt!.toISOString().substring(0, 7);

      if (!history.has(period)) {
        history.set(period, {
          totalScore: 0,
          totalExams: 0
        });
      }

      const item = history.get(period)!;

      item.totalScore += exam.score;
      item.totalExams++;
    }

    const scoreHistory = [...history.entries()].map(([period, value]) => ({
      period,
      averageScore: Number((value.totalScore / value.totalExams).toFixed(2))
    }));

    return {
      completedExams,
      averageScore,
      approvalRate,
      bestResult,
      worstResult,
      scoreHistory
    };
  }

}