import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';

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

    return answer;
  }

  async findHistory(userId: string) {
    return this.prisma.userQuestion.findMany({
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
  }

}