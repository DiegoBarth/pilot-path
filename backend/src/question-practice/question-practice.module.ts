import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { QuestionPracticeController } from './question-practice.controller';
import { QuestionPracticeService } from './question-practice.service';

@Module({
  imports: [
    DatabaseModule
  ],

  controllers: [
    QuestionPracticeController
  ],

  providers: [
    QuestionPracticeService
  ],

  exports: [
    QuestionPracticeService
  ]
})

export class QuestionPracticeModule {}