import { Module } from '@nestjs/common';
import { LearningStatisticsController } from './learning.controller';
import { LearningStatisticsService } from './learning.service';
import { FlashcardAnalyticsService } from './services/flashcard-analytics.service';
import { QuestionAnalyticsService } from './services/question-analytics.service';
import { MockExamAnalyticsService } from './services/mock-exam-analytics.service';
import { SubjectAnalyticsService } from './services/subject-analytics.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LearningStatisticsController],
  providers: [
    LearningStatisticsService,
    FlashcardAnalyticsService,
    QuestionAnalyticsService,
    MockExamAnalyticsService,
    SubjectAnalyticsService,
  ],
  exports: [LearningStatisticsService],
})
export class LearningModule {}
