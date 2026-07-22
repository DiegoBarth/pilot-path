import { EnrollmentStatus, Prisma } from '@prisma/client';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { mapToDto, mapToDtoArray } from '../common/utils/map-to-dto.util';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { CertificationResponseDto } from './dto/certification-response.dto';

@Injectable()
export class CertificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    const certifications = await this.prisma.certification.findMany({
      where: { isActive: true },
      include: {
        enrollments: {
          where: { userId },
        },
      },
    });

    const sorted = certifications.sort((a, b) => {
      const aStatus = a.enrollments[0]?.status;
      const bStatus = b.enrollments[0]?.status;

      const getPriority = (status?: EnrollmentStatus) => {
        switch (status) {
          case EnrollmentStatus.ACTIVE:
            return 1;
          case EnrollmentStatus.PAUSED:
            return 2;
          case undefined:
            return 3;
          case EnrollmentStatus.DROPPED:
            return 4;
          case EnrollmentStatus.COMPLETED:
            return 5;
          default:
            return 6;
        }
      };

      return getPriority(aStatus) - getPriority(bStatus);
    });

    return mapToDtoArray(CertificationResponseDto, sorted);
  }

  async findOne(id: string, userId: string) {
    const certification = await this.prisma.certification.findUnique({
      where: { id },
      include: {
        enrollments: {
          where: { userId },
        },
      },
    });

    if (!certification) {
      throw new NotFoundException('Certification not found');
    }

    return mapToDto(CertificationResponseDto, certification);
  }

  async create(dto: CreateCertificationDto) {
    try {
      const certification = await this.prisma.certification.create({ data: dto });
      return mapToDto(CertificationResponseDto, certification);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Certification slug already exists');
      }

      throw error;
    }
  }

  async update(id: string, dto: UpdateCertificationDto) {
    const certification = await this.prisma.certification.update({
      where: { id },
      data: dto,
    });

    return mapToDto(CertificationResponseDto, certification);
  }

  async findSubjects(id: string) {
    const certification = await this.prisma.certification.findUnique({
      where: { id, deletedAt: null },
      include: {
        subjects: {
          orderBy: { displayOrder: 'asc' },
          include: { subject: true },
        },
      },
    });

    if (!certification) {
      throw new NotFoundException('Certification not found');
    }

    return certification.subjects;
  }
}
