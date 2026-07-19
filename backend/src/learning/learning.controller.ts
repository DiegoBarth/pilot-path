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

}