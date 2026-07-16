import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EnrollmentsService {

  constructor(private readonly prisma: PrismaService) {}

  async enroll(userId: string, certificationId: string) {
    try {
      return await this.prisma.enrollment.create({
        data: {
          userId,
          certificationId
        },

        include: {
          certification: true
        }
      });
    } catch(error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('User is already enrolled in this certification');
      }

      throw error;
    }
  }

  async findAllByUser(userId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        userId
      },

      include: {
        certification: true
      },

      orderBy: {
        createdAt: 'desc'
      }

    });
  }

  async findOne(userId: string, id: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
        where: {
          id,
          userId
        },

        include: {
          certification: true
        }
      });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }

}