import { Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsSwagger } from './enrollments.swagger';

@Controller()
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Auth()
  @Get('enrollments')
  @EnrollmentsSwagger.findAll
  findAll(@AuthUser('id') userId: string) {
    return this.service.findAllByUser(userId);
  }

  @Auth()
  @Get('enrollments/:id')
  @EnrollmentsSwagger.findOne
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser('id') userId: string,
  ) {
    return this.service.findOne(userId, id);
  }

  @Auth()
  @Patch('enrollments/:id/cancel')
  @EnrollmentsSwagger.cancel
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser('id') userId: string,
  ) {
    return this.service.cancel(userId, id);
  }

  @Auth()
  @Post('certifications/:id/enroll')
  @EnrollmentsSwagger.enroll
  enroll(
    @Param('id', ParseUUIDPipe) certificationId: string,
    @AuthUser('id') userId: string,
  ) {
    return this.service.enroll(userId, certificationId);
  }
}
