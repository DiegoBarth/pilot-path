import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PerformanceTrendDto } from '../dto/performance-trend.dto';

@Injectable()
export class MockExamAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMockExamPerformance(userId: string): Promise<number> {
    const result = await this.prisma.mockExam.aggregate({
      where: {
        userId,
        deletedAt: null,
        finishedAt: { not: null },
      },
      _avg: { score: true },
    });

    return Number((result._avg.score ?? 0).toFixed(2));
  }

  async getPerformanceTrend(userId: string): Promise<PerformanceTrendDto[]> {
    const exams = await this.prisma.mockExam.findMany({
      where: {
        userId,
        deletedAt: null,
        finishedAt: { not: null },
      },
      orderBy: { finishedAt: 'asc' },
      select: {
        finishedAt: true,
        score: true,
      },
    });

    return exams.map((exam) => ({
      period: exam.finishedAt!.toISOString().slice(0, 7),
      accuracy: exam.score,
    }));
  }

  async getMockExamStatistics(userId: string) {
    const exams = await this.prisma.mockExam.findMany({
      where: {
        userId,
        deletedAt: null,
        finishedAt: { not: null },
      },
      orderBy: { finishedAt: 'asc' },
      select: {
        score: true,
        passed: true,
        finishedAt: true,
      },
    });

    const completedExams = exams.length;

    if (completedExams === 0) {
      return {
        completedExams: 0,
        averageScore: 0,
        approvalRate: 0,
        bestResult: 0,
        worstResult: 0,
        scoreHistory: [],
      };
    }

    const totalScore = exams.reduce((sum, exam) => sum + exam.score, 0);
    const averageScore = Number((totalScore / completedExams).toFixed(2));
    const approvedExams = exams.filter((exam) => exam.passed).length;
    const approvalRate = Number(
      ((approvedExams / completedExams) * 100).toFixed(2),
    );
    const bestResult = Math.max(...exams.map((exam) => exam.score));
    const worstResult = Math.min(...exams.map((exam) => exam.score));

    const history = new Map<
      string,
      { totalScore: number; totalExams: number }
    >();

    for (const exam of exams) {
      const period = exam.finishedAt!.toISOString().substring(0, 7);

      if (!history.has(period)) {
        history.set(period, { totalScore: 0, totalExams: 0 });
      }

      const item = history.get(period)!;
      item.totalScore += exam.score;
      item.totalExams++;
    }

    const scoreHistory = [...history.entries()].map(([period, value]) => ({
      period,
      averageScore: Number((value.totalScore / value.totalExams).toFixed(2)),
    }));

    return {
      completedExams,
      averageScore,
      approvalRate,
      bestResult,
      worstResult,
      scoreHistory,
    };
  }
}
