import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {

  constructor(private readonly prisma: PrismaService) { }

  async enroll(userId: string, certificationId: string) {
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_certificationId: {
          userId,
          certificationId
        }
      },
      include: {
        certification: true
      },
    });

    if (existingEnrollment) {
      if (
        existingEnrollment.status === EnrollmentStatus.PAUSED ||
        existingEnrollment.status === EnrollmentStatus.DROPPED
      ) {
        return this.prisma.enrollment.update({
          where: {
            id: existingEnrollment.id
          },
          data: {
            status: EnrollmentStatus.ACTIVE,
            completedAt: null
          },
          include: {
            certification: true
          }
        });
      }

      throw new ConflictException('User is already enrolled in this certification');
    }

    return this.prisma.enrollment.create({
      data: {
        userId,
        certificationId,
        status: EnrollmentStatus.ACTIVE
      },
      include: {
        certification: true
      },
    });
  }

  async cancel(id: string) {
    return this.prisma.enrollment.update({
      where: {
        id
      },
      data: {
        status: EnrollmentStatus.DROPPED
      },
    });
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