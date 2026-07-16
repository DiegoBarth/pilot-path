import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';
import { SubjectsSwagger } from './subjects.swagger';

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  @Auth()
  @ApplySwagger(SubjectsSwagger.create)
  create(
    @Body() dto: CreateSubjectDto,
  ) {
    return this.subjectsService.create(dto);
  }

  @Get()
  @Auth()
  @ApplySwagger(SubjectsSwagger.findAll)
  findAll() {
    return this.subjectsService.findAll();
  }
}