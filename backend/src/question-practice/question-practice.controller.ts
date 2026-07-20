import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { QuestionPracticeService } from './question-practice.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionPracticeSwagger } from './question-practice.swagger';

@Auth()
@Controller('questions')
export class QuestionPracticeController {

  constructor(private readonly service: QuestionPracticeService) { }

  @Get('history')
  @QuestionPracticeSwagger.history
  async history(@AuthUser() user: any) {
    return this.service.findHistory(user.id);
  }

  @Post(':id/answer')
  @QuestionPracticeSwagger.answer
  async answer(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateQuestionAnswerDto, @AuthUser() user: any) {
    return this.service.answer(user.id, id, dto);
  }

}