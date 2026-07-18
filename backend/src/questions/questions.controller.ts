import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsSwagger } from './questions.swagger';

@Controller('questions')
export class QuestionsController {

  constructor(private readonly questionsService: QuestionsService) { }

  @Auth(UserRole.ADMIN)
  @Post()
  @QuestionsSwagger.create
  create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Auth()
  @Get()
  @QuestionsSwagger.findAll
  findAll() {
    return this.questionsService.findAll();
  }

  @Auth()
  @Get(':id')
  @QuestionsSwagger.findOne
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.findOne(id);
  }

}