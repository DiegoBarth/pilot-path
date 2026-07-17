import { Module } from '@nestjs/common';
import { FlashcardReviewsController } from './flashcard-reviews.controller';
import { FlashcardReviewsService } from './flashcard-reviews.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [
    FlashcardReviewsController
  ],

  providers: [
    FlashcardReviewsService,
    PrismaService
  ],

  exports: [
    FlashcardReviewsService
  ]
})

export class FlashcardReviewsModule { }