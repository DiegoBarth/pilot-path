import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { CertificationsSwagger } from './certifications.swagger';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly service: CertificationsService) {}

  @Auth()
  @Get()
  @CertificationsSwagger.findAll
  findAll(@AuthUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Auth()
  @Get(':id')
  @CertificationsSwagger.findOne
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser('id') userId: string,
  ) {
    return this.service.findOne(id, userId);
  }

  @Auth(UserRole.ADMIN)
  @Post()
  @CertificationsSwagger.create
  create(@Body() dto: CreateCertificationDto) {
    return this.service.create(dto);
  }

  @Auth(UserRole.ADMIN)
  @Patch(':id')
  @CertificationsSwagger.update
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCertificationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Auth()
  @Get(':id/subjects')
  @CertificationsSwagger.findSubjects
  findSubjects(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findSubjects(id);
  }
}
