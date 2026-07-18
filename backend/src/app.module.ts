import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CertificationsModule } from './certifications/certifications.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StudySessionsModule } from './study-sessions/study-sessions.module';
import { StudyHistoryModule } from './study-history/study-history.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { FlashcardReviewsModule } from './flashcard-reviews/flashcard-reviews.module';
import { QuestionsModule } from './questions/questions.module';
import { QuestionPracticeModule } from './question-practice/question-practice.module';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig
      ],
    }),

    DatabaseModule,
    HealthModule,
    AuthModule,
    CertificationsModule,
    EnrollmentsModule,
    SubjectsModule,
    StudySessionsModule,
    StudyHistoryModule,
    FlashcardReviewsModule,
    FlashcardsModule,
    QuestionPracticeModule,
    QuestionsModule,
  ],
})

export class AppModule { }