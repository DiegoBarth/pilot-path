import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { mapToDto, mapToDtoArray } from '../common/utils/map-to-dto.util';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    try {
      const subject = await this.prisma.subject.create({ data: dto });
      return mapToDto(SubjectResponseDto, subject);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Subject slug already exists');
      }

      throw error;
    }
  }

  async findAll() {
    const subjects = await this.prisma.subject.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });

    return mapToDtoArray(SubjectResponseDto, subjects);
  }
}
