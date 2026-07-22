import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { mapToDto, mapToDtoArray } from '../common/utils/map-to-dto.util';
import { EnrollmentResponseDto } from './dto/enrollment-response.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(userId: string, certificationId: string) {
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_certificationId: {
          userId,
          certificationId,
        },
      },
      include: {
        certification: true,
      },
    });

    if (existingEnrollment) {
      if (
        existingEnrollment.status === EnrollmentStatus.PAUSED ||
        existingEnrollment.status === EnrollmentStatus.DROPPED
      ) {
        const enrollment = await this.prisma.enrollment.update({
          where: { id: existingEnrollment.id },
          data: {
            status: EnrollmentStatus.ACTIVE,
            completedAt: null,
          },
          include: { certification: true },
        });

        return mapToDto(EnrollmentResponseDto, enrollment);
      }

      throw new ConflictException('User is already enrolled in this certification');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: {
        userId,
        certificationId,
        status: EnrollmentStatus.ACTIVE,
      },
      include: { certification: true },
    });

    return mapToDto(EnrollmentResponseDto, enrollment);
  }

  async cancel(userId: string, id: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { id, userId },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const updated = await this.prisma.enrollment.update({
      where: { id },
      data: { status: EnrollmentStatus.DROPPED },
      include: { certification: true },
    });

    return mapToDto(EnrollmentResponseDto, updated);
  }

  async findAllByUser(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: { certification: true },
      orderBy: { createdAt: 'desc' },
    });

    return mapToDtoArray(EnrollmentResponseDto, enrollments);
  }

  async findOne(userId: string, id: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { id, userId },
      include: { certification: true },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return mapToDto(EnrollmentResponseDto, enrollment);
  }
}
