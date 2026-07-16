import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    try {
      return await this.prisma.subject.create({
        data: dto
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Subject slug already exists');
      }

      throw error;
    }
  }

  async findAll() {
    return this.prisma.subject.findMany({
      where: {
        deletedAt: null
      },

      orderBy: {
        name: 'asc'
      },
    });
  }

}