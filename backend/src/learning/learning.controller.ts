import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { LearningStatisticsService } from './learning.service';
import { LearningStatisticsSwagger } from './learning.swagger';

@Controller()
export class LearningStatisticsController {

  constructor(private readonly service: LearningStatisticsService) { }

  @Auth()
  @Get('learning/statistics')
  @ApplySwagger(LearningStatisticsSwagger.statistics)
  find(@AuthUser('id') userId: string) {
    return this.service.getStatistics(userId);
  }

  @Auth()
  @Get('learning/statistics/flashcards')
  @ApplySwagger(LearningStatisticsSwagger.flashcards)
  flashcards(@AuthUser('id') userId: string) {
    return this.service.getFlashcardStatistics(userId);
  }

  @Auth()
  @Get('learning/statistics/questions')
  @ApplySwagger(LearningStatisticsSwagger.questions)
  questions(@AuthUser('id') userId: string) {
    return this.service.getQuestionStatistics(userId);
  }

  @Auth()
  @Get('learning/statistics/mock-exams')
  @ApplySwagger(LearningStatisticsSwagger.mockExams)
  mockExams(@AuthUser('id') userId: string) {
    return this.service.getMockExamStatistics(userId);
  }

  @Auth()
  @Get('learning/statistics/subjects')
  @ApplySwagger(LearningStatisticsSwagger.subjects)
  subjects(@AuthUser('id') userId: string) {
    return this.service.getSubjectAnalytics(userId);
  }

}