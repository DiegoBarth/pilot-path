import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateMockExamDto } from './dto/create-mock-exam.dto';
import { FinishMockExamDto } from './dto/finish-mock-exam.dto';

@Injectable()
export class MockExamsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(userId: string, dto: CreateMockExamDto) {
    const questionCount = dto.questionCount ?? 20;

    if (questionCount <= 0) {
      throw new BadRequestException('Total questions must be greater than zero.');
    }

    const subject = await this.prisma.subject.findFirst({
      where: {
        id: dto.subjectId,
        deletedAt: null,
      },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found.');
    }

    const subjectId = dto.subjectId;

    const where: Prisma.QuestionWhereInput = {
      deletedAt: null,
      isActive: true,
      ...(subjectId && { subjectId })
    };

    const availableQuestions = await this.prisma.question.findMany({
      where,
      include: {
        alternatives: {
          select: {
            id: true,
            letter: true,
            content: true
          }
        }
      }
    });

    if (availableQuestions.length < questionCount) {
      throw new BadRequestException(`Only ${availableQuestions.length} questions are available.`);
    }

    const shuffledQuestions = this.shuffle([...availableQuestions]);
    const selectedQuestions = shuffledQuestions.slice(0, questionCount);

    const exam = await this.prisma.mockExam.create({
      data: {
        userId,
        subjectId,
        totalQuestions: questionCount,
        questions: {
          create: selectedQuestions.map((question, index) => ({
            questionId: question.id,
            displayOrder: index + 1
          }))
        }
      },
      include: {
        questions: {
          orderBy: {
            displayOrder: 'asc'
          },
          include: {
            question: {
              include: {
                alternatives: {
                  select: {
                    id: true,
                    letter: true,
                    content: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return exam;
  }

  async finish(userId: string, examId: string, dto: FinishMockExamDto) {
    const exam = await this.prisma.mockExam.findFirst({
      where: {
        id: examId,
        userId,
        deletedAt: null
      },
      include: {
        questions: true
      }
    });

    if (!exam) {
      throw new NotFoundException('Mock exam not found.');
    }

    if (exam.finishedAt) {
      throw new BadRequestException('Mock exam has already been finished.');
    }

    if (dto.answers.length !== exam.questions.length) {
      throw new BadRequestException('All questions must be answered.');
    }

    const questionIds = exam.questions.map(question => question.questionId);

    const alternatives = await this.prisma.questionAlternative.findMany({
      where: {
        questionId: {
          in: questionIds
        }
      }
    });

    const alternativesMap = new Map(
      alternatives.map(alternative => [alternative.id, alternative])
    );

    let correctAnswers = 0;

    for (const answer of dto.answers) {

      const examQuestion = exam.questions.find(
        question => question.questionId === answer.questionId
      );

      if (!examQuestion) {
        throw new BadRequestException(`Question ${answer.questionId} does not belong to this mock exam.`);
      }

      const alternative = alternativesMap.get(answer.alternativeId);

      if (!alternative) {
        throw new BadRequestException(`Alternative ${answer.alternativeId} not found.`);
      }

      if (alternative.questionId !== answer.questionId) {
        throw new BadRequestException('Alternative does not belong to the specified question.');
      }

      const isCorrect = alternative.isCorrect;

      if (isCorrect) {
        correctAnswers++;
      }

      await this.prisma.mockExamQuestion.update({
        where: {
          id: examQuestion.id
        },
        data: {
          selectedAlternativeId: alternative.id,
          isCorrect
        }
      });

    }

    const score = Math.round(
      (correctAnswers / exam.totalQuestions) * 100
    );

    const passed       = score >= exam.passingScore;
    const finishedExam = await this.prisma.mockExam.update({
      where: {
        id: exam.id
      },
      data: {
        finishedAt: new Date(),
        duration: dto.duration,
        correctAnswers,
        score,
        passed
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                alternatives: true
              }
            },
            selectedAlternative: true
          }
        }
      }
    });

    return finishedExam;
  }

  async findAll(userId: string) {
    return this.prisma.mockExam.findMany({
      where: {
        userId,
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        subject: true
      }
    });

  }

  async findOne(userId: string, id: string) {
    const exam = await this.prisma.mockExam.findFirst({
      where: {
        id,
        userId,
        deletedAt: null
      },
      include: {
        subject: true,
        questions: {
          orderBy: {
            displayOrder: 'asc'
          },
          include: {
            question: {
              include: {
                alternatives: {
                  select: {
                    id: true,
                    letter: true,
                    content: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!exam) {
      throw new NotFoundException('Mock exam not found.');
    }

    return exam;
  }

  private shuffle<T>(items: T[]): T[] {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i--) {
      const j    = Math.floor(Math.random() * (i + 1));
      const temp = array[i]!;

      array[i] = array[j]!;
      array[j] = temp;
    }

    return array;
  }

}