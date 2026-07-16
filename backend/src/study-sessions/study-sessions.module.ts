import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StudySessionsController } from './study-sessions.controller';
import { StudySessionsService } from './study-sessions.service';

@Module({
  imports: [
    DatabaseModule
  ],

  controllers: [
    StudySessionsController
  ],

  providers: [
    StudySessionsService
  ],
})
export class StudySessionsModule { }