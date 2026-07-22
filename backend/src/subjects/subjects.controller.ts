import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';
import { SubjectsSwagger } from './subjects.swagger';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Auth(UserRole.ADMIN)
  @Post()
  @SubjectsSwagger.create
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto);
  }

  @Auth()
  @Get()
  @SubjectsSwagger.findAll
  findAll() {
    return this.subjectsService.findAll();
  }
}
