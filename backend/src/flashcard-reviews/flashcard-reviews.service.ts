import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFlashcardReviewDto } from './dto/create-flashcard-review.dto';

@Injectable()
export class FlashcardReviewsService {

  constructor(private readonly prisma: PrismaService) { }

  async review(userId: string, flashcardId: string, dto: CreateFlashcardReviewDto) {
    const flashcard = await this.prisma.flashcard.findFirst({
      where: {
        id: flashcardId,
        isActive: true,
        deletedAt: null
      }
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found.');
    }

    let userFlashcard = await this.prisma.userFlashcard.findUnique({
      where: {
        userId_flashcardId: {
          userId,
          flashcardId
        }
      }
    });

    if (!userFlashcard) {
      userFlashcard = await this.prisma.userFlashcard.create({
        data: {
          userId,
          flashcardId
        }
      });
    }

    const reviewedAt = new Date();

    const nextReviewAt = this.calculateNextReview(dto.correct, userFlashcard.correctCount, userFlashcard.wrongCount);

    const review = await this.prisma.flashcardReview.create({
      data: {
        userFlashcardId: userFlashcard.id,
        isCorrect: dto.correct,
        reviewedAt
      }
    });

    await this.prisma.userFlashcard.update({
      where: {
        id: userFlashcard.id
      },
      data: {
        ...(dto.correct && {
          correctCount: {
            increment: 1
          }
        }),

        ...(!dto.correct && {
          wrongCount: {
            increment: 1
          }
        }),

        lastReviewedAt: reviewedAt,
        nextReviewAt
      }
    });

    return review;
  }

  async findReviews(userId: string) {
    return this.prisma.flashcardReview.findMany({
      where: {
        userFlashcard: {
          userId
        }
      },

      include: {
        userFlashcard: {
          include: {
            flashcard: true
          }
        }
      },

      orderBy: {
        reviewedAt: 'desc'
      }
    });

  }

  private calculateNextReview(correct: boolean, correctCount: number, wrongCount: number) {
    const now = new Date();

    if (!correct) {
      now.setMinutes(now.getMinutes() + 30);

      return now;
    }

    const intervals = [1, 3, 7, 14, 30];

    const level = Math.min(correctCount, intervals.length - 1);

    now.setDate(now.getDate() + (intervals[level] ?? 1));

    return now;
  }

}