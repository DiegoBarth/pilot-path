import { Module } from '@nestjs/common';
import { LearningStatisticsController } from './learning.controller';
import { LearningStatisticsService } from './learning.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    LearningStatisticsController
  ],
  providers: [
    LearningStatisticsService
  ],
  exports: [
    LearningStatisticsService
  ]
})

export class LearningModule {}