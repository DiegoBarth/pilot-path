import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { mapToDto } from '../common/utils/map-to-dto.util';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { FlashcardQueryDto } from './dto/flashcard-query.dto';
import { FlashcardOverviewDto } from './dto/flashcard-overview.dto';
import { FlashcardResponseDto } from './dto/flashcard-response.dto';

@Injectable()
export class FlashcardsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateFlashcardDto) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id: dto.subjectId,
        deletedAt: null
      }
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    const exists = await this.prisma.flashcard.findFirst({
      where: {
        subjectId: dto.subjectId,
        question: dto.question,
        deletedAt: null
      }
    });

    if (exists) {
      throw new ConflictException('Flashcard already exists.');
    }

    const flashcard = await this.prisma.flashcard.create({
      data: {
        subjectId: dto.subjectId,
        question: dto.question,
        answer: dto.answer
      },
      include: {
        subject: true
      }
    });

    return mapToDto(FlashcardResponseDto, flashcard);
  }

  async findAll(userId: string, query: FlashcardQueryDto = {}) {
    const flashcards = await this.prisma.flashcard.findMany({
      where: this.buildFlashcardWhere(query),
      include: {
        subject: true,
        userFlashcards: {
          where: {
            userId,
            deletedAt: null
          },
          take: 1
        }
      },
      orderBy: [
        {
          subject: {
            name: 'asc'
          }
        },
        {
          question: 'asc'
        }
      ]
    });

    return flashcards.map(({ userFlashcards, ...flashcard }) => ({
      ...flashcard,
      userFlashcard: userFlashcards[0] ?? null,
    }));
  }

  async getOverview(userId: string, query: FlashcardQueryDto = {}): Promise<FlashcardOverviewDto> {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const where = this.buildFlashcardWhere(query);

    const flashcards = await this.prisma.flashcard.findMany({
      where,
      select: {
        id: true
      }
    });

    const flashcardIds = flashcards.map((flashcard) => flashcard.id);

    if (flashcardIds.length === 0) {
      return {
        dueTodayCount: 0,
        reviewedTodayCount: 0,
        accuracyRate: 0,
        availableCount: 0,
        totalCount: 0
      };
    }

    const [userFlashcards, reviewedTodayCount, accuracyRate] = await Promise.all([
      this.prisma.userFlashcard.findMany({
        where: {
          userId,
          deletedAt: null,
          flashcardId: {
            in: flashcardIds
          }
        }
      }),
      this.prisma.flashcardReview.count({
        where: {
          userFlashcard: {
            userId,
            flashcardId: {
              in: flashcardIds
            }
          },
          reviewedAt: {
            gte: startOfToday
          }
        }
      }),
      this.getAccuracyRate(userId, flashcardIds)
    ]);

    const userFlashcardByCardId = new Map(
      userFlashcards.map((item) => [item.flashcardId, item]),
    );

    let dueTodayCount = 0;

    for (const flashcard of flashcards) {
      const userFlashcard = userFlashcardByCardId.get(flashcard.id);

      if (this.isFlashcardDue(userFlashcard, now)) {
        dueTodayCount++;
      }
    }

    return {
      dueTodayCount,
      reviewedTodayCount,
      accuracyRate,
      availableCount: dueTodayCount,
      totalCount: flashcards.length
    };
  }

  async getReviewQueue(userId: string, query: FlashcardQueryDto = {}) {
    const now = new Date();

    const flashcards = await this.prisma.flashcard.findMany({
      where: this.buildFlashcardWhere(query),
      include: {
        subject: true,
        userFlashcards: {
          where: {
            userId,
            deletedAt: null
          },
          take: 1
        }
      },
      orderBy: [
        {
          subject: {
            name: 'asc'
          }
        },
        {
          question: 'asc'
        }
      ]
    });

    return flashcards
      .filter((flashcard) => {
        const userFlashcard = flashcard.userFlashcards[0];

        return this.isFlashcardDue(userFlashcard, now);
      })
      .map((flashcard) => ({
        id: flashcard.id,
        subjectId: flashcard.subjectId,
        question: flashcard.question,
        answer: flashcard.answer,
        isActive: flashcard.isActive,
        createdAt: flashcard.createdAt,
        updatedAt: flashcard.updatedAt,
        deletedAt: flashcard.deletedAt,
        subject: flashcard.subject,
        userFlashcard: flashcard.userFlashcards[0] ?? null
      }));
  }

  async findOne(id: string, userId?: string) {
    const flashcard = await this.prisma.flashcard.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null
      },
      include: {
        subject: true,
        ...(userId && {
          userFlashcards: {
            where: {
              userId,
              deletedAt: null
            },
            take: 1
          }
        })
      }
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found.');
    }

    if (!userId) {
      return mapToDto(FlashcardResponseDto, flashcard);
    }

    return {
      ...flashcard,
      userFlashcard: flashcard.userFlashcards?.[0] ?? null,
      userFlashcards: undefined
    };
  }

  private buildFlashcardWhere(query: FlashcardQueryDto): Prisma.FlashcardWhereInput {
    return {
      isActive: true,
      deletedAt: null,

      ...(query.subjectId && {
        subjectId: query.subjectId
      }),

      ...(query.certificationId && {
        subject: {
          certifications: {
            some: {
              certificationId: query.certificationId
            }
          }
        }
      })
    };
  }

  private isFlashcardDue(
    userFlashcard?: {
      nextReviewAt: Date | null;
    } | null,
    now = new Date(),
  ) {
    if (!userFlashcard) {
      return true;
    }

    if (!userFlashcard.nextReviewAt) {
      return true;
    }

    return userFlashcard.nextReviewAt <= now;
  }

  private async getAccuracyRate(userId: string, flashcardIds?: string[]) {
    const result = await this.prisma.userFlashcard.aggregate({
      where: {
        userId,
        deletedAt: null,
        ...(flashcardIds && {
          flashcardId: {
            in: flashcardIds
          }
        })
      },
      _sum: {
        correctCount: true,
        wrongCount: true
      }
    });

    const correct = result._sum.correctCount ?? 0;
    const wrong = result._sum.wrongCount ?? 0;
    const total = correct + wrong;

    if (total === 0) {
      return 0;
    }

    return Number(((correct / total) * 100).toFixed(2));
  }

}
