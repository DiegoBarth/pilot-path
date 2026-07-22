import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { CreateStudySessionDto } from './dto/create-study-session.dto';
import { CreateStudySessionBySubjectDto } from './dto/create-study-session-by-subject.dto';
import { StudySessionsService } from './study-sessions.service';
import { StudySessionsSwagger } from './study-sessions.swagger';

@ApiTags('Study Sessions')
@Controller('study-sessions')
export class StudySessionsController {
  
  constructor(private readonly studySessionsService: StudySessionsService) { }

  @Auth()
  @Post('by-subject')
  @ApplySwagger(StudySessionsSwagger.createBySubject)
  createBySubject(
    @AuthUser('id', ParseUUIDPipe) userId: string,
    @Body() dto: CreateStudySessionBySubjectDto,
  ) {
    return this.studySessionsService.createBySubject(userId, dto);
  }

  @Auth()
  @Post()
  @ApplySwagger(StudySessionsSwagger.create)
  create(@AuthUser('id', ParseUUIDPipe) userId: string, @Body() dto: CreateStudySessionDto) {
    return this.studySessionsService.create(userId, dto);
  }

  @Auth()
  @Get()
  @ApplySwagger(StudySessionsSwagger.findAll)
  findAll(@AuthUser('id', ParseUUIDPipe) userId: string) {
    return this.studySessionsService.findAll(userId);
  }

  @Auth()
  @Get(':id')
  @ApplySwagger(StudySessionsSwagger.findOne)
  findOne(@Param('id', ParseUUIDPipe) id: string, @AuthUser('id', ParseUUIDPipe) userId: string) {
    return this.studySessionsService.findOne(id, userId);
  }
  
}