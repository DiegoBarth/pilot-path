import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { mapToDto, mapToDtoArray } from '../common/utils/map-to-dto.util';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

@Injectable()
export class QuestionsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateQuestionDto) {

    const subject = await this.prisma.subject.findFirst({
      where: {
        id: dto.subjectId,
        deletedAt: null
      }
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    const existingQuestion = await this.prisma.question.findFirst({
      where: {
        subjectId: dto.subjectId,
        statement: dto.statement,
        deletedAt: null
      }
    });

    if (existingQuestion) {
      throw new ConflictException('Question already exists for this subject.');
    }

    const correctAlternatives = dto.alternatives.filter(
      alternative => alternative.isCorrect
    );

    if (correctAlternatives.length !== 1) {
      throw new BadRequestException('A question must contain exactly one correct alternative.');
    }

    const letters = dto.alternatives.map(a => a.letter);

    if (new Set(letters).size !== letters.length) {
      throw new BadRequestException(
        'Alternative letters must be unique.',
      );
    }

    const data: Prisma.QuestionCreateInput = {
      subject: { connect: { id: dto.subjectId } },
      statement: dto.statement,
      difficulty: dto.difficulty,
      isActive: dto.isActive ?? true,
      ...(dto.explanation !== undefined && { explanation: dto.explanation }),
      alternatives: {
        create: dto.alternatives.map((alternative) => ({
          letter: alternative.letter,
          content: alternative.content,
          isCorrect: alternative.isCorrect,
        })),
      },
    };

    const question = await this.prisma.question.create({
      data,
      include: {
        subject: true,
        alternatives: {
          select: {
            id: true,
            letter: true,
            content: true,
          },
          orderBy: {
            letter: 'asc',
          },
        },
      },
    });

    return mapToDto(QuestionResponseDto, question);
  }

  async findAll() {
    const questions = await this.prisma.question.findMany({
      where: {
        isActive: true,
        deletedAt: null
      },

      include: {
        subject: true,

        alternatives: {
          select: {
            id: true,
            letter: true,
            content: true
          },
          orderBy: {
            letter: 'asc'
          }
        }
      },

      orderBy: {
        statement: 'asc'
      }
    });

    return mapToDtoArray(QuestionResponseDto, questions);
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null
      },

      include: {
        subject: true,

        alternatives: {
          select: {
            id: true,
            letter: true,
            content: true
          },
          orderBy: {
            letter: 'asc'
          }
        }
      }
    });

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    return mapToDto(QuestionResponseDto, question);
  }

}