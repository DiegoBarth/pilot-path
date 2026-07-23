import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { MockExamsService } from './mock-exams.service';
import { CreateMockExamDto } from './dto/create-mock-exam.dto';
import { FinishMockExamDto } from './dto/finish-mock-exam.dto';
import { MockExamsSwagger } from './mock-exams.swagger';

@Auth()
@Controller('mock-exams')
export class MockExamsController {
  constructor(private readonly service: MockExamsService) {}

  @Post()
  @MockExamsSwagger.create
  create(@Body() dto: CreateMockExamDto, @AuthUser() user: AuthenticatedUser) {
    return this.service.create(user.id, dto);
  }

  @Get()
  @MockExamsSwagger.findAll
  findAll(@AuthUser() user: AuthenticatedUser) {
    return this.service.findAll(user.id);
  }

  @Get('subjects-availability')
  @MockExamsSwagger.getSubjectsAvailability
  getSubjectsAvailability() {
    return this.service.getSubjectsAvailability();
  }

  @Get(':id')
  @MockExamsSwagger.findOne
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: AuthenticatedUser,
  ) {
    return this.service.findOne(user.id, id);
  }

  @Post(':id/finish')
  @MockExamsSwagger.finish
  finish(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: FinishMockExamDto,
    @AuthUser() user: AuthenticatedUser,
  ) {
    return this.service.finish(user.id, id, dto);
  }
}
