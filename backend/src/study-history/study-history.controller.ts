import { Controller, Get, Query } from '@nestjs/common';

import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

import { StudyHistoryService } from './study-history.service';
import { StudyHistoryQueryDto } from './dto/study-history-query.dto';
import { StudyHistorySwagger } from './study-history.swagger';

@Controller('study-history')
@Auth()
export class StudyHistoryController {

  constructor(private readonly studyHistoryService: StudyHistoryService) { }

  @Get()
  @ApplySwagger(StudyHistorySwagger.findAll)
  findAll(@AuthUser('id') userId: string, @Query() query: StudyHistoryQueryDto) {
    return this.studyHistoryService.findAll(userId, query);
  }
  
}