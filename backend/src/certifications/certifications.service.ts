import { Prisma } from '@prisma/client';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.certification.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.certification.findUnique({
      where: {
        id
      }
    });
  }

  async create(dto: CreateCertificationDto) {
    try {
      return await this.prisma.certification.create({ data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Certification slug already exists');
      }

      throw error;
    }
  }

  async update(id: string, dto: UpdateCertificationDto) {
    return this.prisma.certification.update({
      where: {
        id
      },
      data: dto
    });
  }

  async enroll(userId: string, certificationId: string) {
    const certification = await this.prisma.certification.findUnique({
      where: {
        id: certificationId
      }
    });

    if (!certification) {
      throw new NotFoundException('Certification not found');
    }

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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('User is already enrolled in this certification');
      }

      throw error;
    }
  }

  async findSubjects(id: string) {
    const certification = await this.prisma.certification.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        subjects: {
          orderBy: {
            displayOrder: 'asc'
          },
          include: {
            subject: true
          },
        }
      }
    });

    if (!certification) {
      throw new NotFoundException('Certification not found');
    }

    return certification.subjects;
  }

}