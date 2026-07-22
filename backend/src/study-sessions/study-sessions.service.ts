import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateStudySessionDto } from './dto/create-study-session.dto';
import { CreateStudySessionBySubjectDto } from './dto/create-study-session-by-subject.dto';

@Injectable()
export class StudySessionsService {

  constructor(private readonly prisma: PrismaService) { }

  async createBySubject(userId: string, dto: CreateStudySessionBySubjectDto) {
    const certificationSubject = await this.resolveCertificationSubject(
      userId,
      dto.subjectId,
      dto.certificationId,
    );

    return this.create(userId, {
      certificationSubjectId: certificationSubject.id,
      startedAt: dto.startedAt,
      endedAt: dto.endedAt,
      studyType: dto.studyType,
      ...(dto.mood !== undefined && { mood: dto.mood }),
      ...(dto.notes !== undefined && { notes: dto.notes }),
    });
  }

  private async resolveCertificationSubject(
    userId: string,
    subjectId: string,
    certificationId?: string,
  ) {
    if (certificationId) {
      const certificationSubject = await this.prisma.certificationSubject.findFirst({
        where: {
          certificationId,
          subjectId,
        },
      });

      if (!certificationSubject) {
        throw new NotFoundException(
          'Subject not found in the selected certification.',
        );
      }

      return certificationSubject;
    }

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        userId,
        status: EnrollmentStatus.ACTIVE,
        deletedAt: null,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    for (const enrollment of enrollments) {
      const certificationSubject = await this.prisma.certificationSubject.findFirst({
        where: {
          certificationId: enrollment.certificationId,
          subjectId,
        },
      });

      if (certificationSubject) {
        return certificationSubject;
      }
    }

    throw new NotFoundException(
      'No active enrollment found for this subject.',
    );
  }

  async create(userId: string, dto: CreateStudySessionDto) {
    const certificationSubject = await this.prisma.certificationSubject.findFirst({
      where: {
        id: dto.certificationSubjectId
      },
      include: {
        certification: true
      },
    });

    if (!certificationSubject) {
      throw new NotFoundException('Certification subject not found.');
    }

    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        userId,
        certificationId: certificationSubject.certificationId,
        status: EnrollmentStatus.ACTIVE,
        deletedAt: null
      }
    });

    if (!enrollment) {
      throw new BadRequestException('You are not enrolled in this certification.');
    }

    const startedAt = new Date(dto.startedAt);
    const endedAt = new Date(dto.endedAt);

    if (endedAt <= startedAt) {
      throw new BadRequestException('End date must be after start date.');
    }

    return this.prisma.studySession.create({
      data: {
        enrollmentId: enrollment.id,
        certificationSubjectId: certificationSubject.id,
        startedAt,
        endedAt,
        studyType: dto.studyType,
        mood: dto.mood ?? null,
        notes: dto.notes ?? null
      },
      include: {
        certificationSubject: {
          include: {
            certification: true,
            subject: true
          }
        }
      }
    });
  }

  async findAll(userId: string) {
    return this.prisma.studySession.findMany({
      where: {
        enrollment: {
          userId
        },
        deletedAt: null
      },
      include: {
        certificationSubject: {
          include: {
            certification: true,
            subject: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    });
  }

  async findOne(id: string, userId: string) {
    const session = await this.prisma.studySession.findFirst({
      where: {
        id,
        deletedAt: null,
        enrollment: {
          userId
        }
      },
      include: {
        certificationSubject: {
          include: {
            certification: true,
            subject: true
          }
        }
      }
    });

    if (!session) {
      throw new NotFoundException('Study session not found.');
    }

    return session;
  }
}