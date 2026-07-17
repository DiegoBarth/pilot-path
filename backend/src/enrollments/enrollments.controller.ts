import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { EnrollmentsService } from './enrollments.service';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { EnrollmentsSwagger } from './enrollments.swagger';

@Controller()
export class EnrollmentsController {

  constructor(private readonly service: EnrollmentsService) { }

  @Post('certifications/:id/enroll')
  @Auth()
  @ApplySwagger(EnrollmentsSwagger.enroll)
  enroll(@Param('id', ParseUUIDPipe) certificationId: string, @AuthUser('id') userId: string) {
    return this.service.enroll(userId, certificationId);
  }

  @Get('enrollments')
  @Auth()
  @ApplySwagger(EnrollmentsSwagger.findAll)
  findAll(@AuthUser('id') userId: string) {
    return this.service.findAllByUser(userId);
  }

  @Get('enrollments/:id')
  @Auth()
  @ApplySwagger(EnrollmentsSwagger.findOne)
  findOne(@Param('id', ParseUUIDPipe) id: string, @AuthUser('id') userId: string) {
    return this.service.findOne(userId, id);
  }

}