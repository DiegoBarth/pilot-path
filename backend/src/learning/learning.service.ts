import { Injectable } from '@nestjs/common';
import { LearningStatisticsDto } from './dto/learning-statistics.dto';
import { FlashcardAnalyticsService } from './services/flashcard-analytics.service';
import { QuestionAnalyticsService } from './services/question-analytics.service';
import { MockExamAnalyticsService } from './services/mock-exam-analytics.service';
import { SubjectAnalyticsService } from './services/subject-analytics.service';

@Injectable()
export class LearningStatisticsService {
  constructor(
    private readonly flashcardAnalytics: FlashcardAnalyticsService,
    private readonly questionAnalytics: QuestionAnalyticsService,
    private readonly mockExamAnalytics: MockExamAnalyticsService,
    private readonly subjectAnalytics: SubjectAnalyticsService,
  ) {}

  async getStatistics(userId: string): Promise<LearningStatisticsDto> {
    const [
      flashcardAccuracy,
      questionAccuracy,
      mockExamPerformance,
      subjectPerformance,
      weakSubjects,
      performanceTrends,
    ] = await Promise.all([
      this.flashcardAnalytics.getFlashcardAccuracy(userId),
      this.questionAnalytics.getQuestionAccuracy(userId),
      this.mockExamAnalytics.getMockExamPerformance(userId),
      this.subjectAnalytics.getSubjectPerformance(userId),
      this.subjectAnalytics.getWeakSubjects(userId),
      this.mockExamAnalytics.getPerformanceTrend(userId),
    ]);

    return {
      flashcardAccuracy,
      questionAccuracy,
      mockExamPerformance,
      subjectPerformance,
      weakSubjects,
      performanceTrends,
    };
  }

  getFlashcardAccuracy(userId: string) {
    return this.flashcardAnalytics.getFlashcardAccuracy(userId);
  }

  getFlashcardStatistics(userId: string) {
    return this.flashcardAnalytics.getFlashcardStatistics(userId);
  }

  getQuestionStatistics(userId: string) {
    return this.questionAnalytics.getQuestionStatistics(userId);
  }

  getMockExamStatistics(userId: string) {
    return this.mockExamAnalytics.getMockExamStatistics(userId);
  }

  getSubjectAnalytics(userId: string) {
    return this.subjectAnalytics.getSubjectAnalytics(userId);
  }
}
