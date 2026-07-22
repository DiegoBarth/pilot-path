import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { mapToDto, mapToDtoArray } from '../common/utils/map-to-dto.util';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionAnswerResponseDto } from './dto/question-answer-response.dto';

@Injectable()
export class QuestionPracticeService {

  constructor(private readonly prisma: PrismaService) { }

  async answer(userId: string, questionId: string, dto: CreateQuestionAnswerDto) {
    const question = await this.prisma.question.findFirst({
      where: {
        id: questionId,
        isActive: true,
        deletedAt: null
      },

      include: {
        alternatives: true
      }
    });

    if (!question) {
      throw new NotFoundException('Question not found.');
    }

    const alternative = question.alternatives.find(
      item => item.id === dto.alternativeId
    );

    if (!alternative) {
      throw new BadRequestException('Alternative does not belong to this question.');
    }

    const isCorrect = alternative.isCorrect;

    const answer = await this.prisma.userQuestion.create({
      data: {
        userId,
        questionId,
        selectedAlternativeId: dto.alternativeId,
        isCorrect,
        responseTime: dto.responseTime
      }
    });

    return mapToDto(QuestionAnswerResponseDto, answer);
  }

  async findHistory(userId: string) {
    const history = await this.prisma.userQuestion.findMany({
      where: {
        userId
      },

      include: {
        question: {
          select: {
            id: true,
            statement: true,
            explanation: true,
            difficulty: true
          }
        },

        selectedAlternative: {
          select: {
            id: true,
            letter: true,
            content: true
          }
        }
      },

      orderBy: {
        answeredAt: 'desc'
      }
    });

    return mapToDtoArray(QuestionAnswerResponseDto, history);
  }

}