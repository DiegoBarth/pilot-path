import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StudySessionsModule } from '../study-sessions/study-sessions.module';
import { MockExamsController } from './mock-exams.controller';
import { MockExamsService } from './mock-exams.service';

@Module({
  imports: [DatabaseModule, StudySessionsModule],
  controllers: [MockExamsController],
  providers: [MockExamsService],
  exports: [MockExamsService],
})
export class MockExamsModule {}