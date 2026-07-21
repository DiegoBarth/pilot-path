import { Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { EnrollmentsService } from './enrollments.service';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { EnrollmentsSwagger } from './enrollments.swagger';

@Controller()
export class EnrollmentsController {

  constructor(private readonly service: EnrollmentsService) { }

  @Auth()
  @Get('enrollments')
  @ApplySwagger(EnrollmentsSwagger.findAll)
  findAll(@AuthUser('id') userId: string) {
    return this.service.findAllByUser(userId);
  }

  @Auth()
  @Get('enrollments/:id')
  @ApplySwagger(EnrollmentsSwagger.findOne)
  findOne(@Param('id', ParseUUIDPipe) id: string, @AuthUser('id') userId: string) {
    return this.service.findOne(userId, id);
  }

  @Auth()
  @Patch('enrollments/:id/cancel')
  @ApplySwagger(EnrollmentsSwagger.cancel)
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }

  @Auth()
  @Post('certifications/:id/enroll')
  @ApplySwagger(EnrollmentsSwagger.enroll)
  enroll(@Param('id', ParseUUIDPipe) certificationId: string, @AuthUser('id') userId: string) {
    return this.service.enroll(userId, certificationId);
  }

}