import { Module } from '@nestjs/common';
import { StudyHistoryController } from './study-history.controller';
import { StudyHistoryService } from './study-history.service';

@Module({
  controllers: [
    StudyHistoryController
  ],
  providers: [
    StudyHistoryService
  ],
})
export class StudyHistoryModule { }