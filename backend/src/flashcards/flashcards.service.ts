import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

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

    return this.prisma.flashcard.create({
      data: {
        subjectId: dto.subjectId,
        question: dto.question,
        answer: dto.answer
      },
      include: {
        subject: true
      }
    });
  }

  async findAll(subjectId?: string) {
    return this.prisma.flashcard.findMany({
      where: {
        isActive: true,
        deletedAt: null,

        ...(subjectId && {
          subjectId
        })
      },
      include: {
        subject: true
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
  }

  async findOne(id: string) {
    const flashcard = await this.prisma.flashcard.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null
      },
      include: {
        subject: true
      }
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found.');
    }

    return flashcard;
  }

}