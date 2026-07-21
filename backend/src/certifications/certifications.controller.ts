import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { CertificationsSwagger } from './certifications.swagger';
import { AuthUser } from '../auth/decorators/auth-user.decorator';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly service: CertificationsService) {}

  @Get()
  @ApplySwagger(CertificationsSwagger.findAll)
  findAll(@AuthUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApplySwagger(CertificationsSwagger.findOne)
  findOne(@Param('id', ParseUUIDPipe) id: string, @AuthUser('id') userId: string) {
    return this.service.findOne(id, userId);
  }

  @Auth()
  @Post()
  @ApplySwagger(CertificationsSwagger.create)
  create(@Body() dto: CreateCertificationDto) {
    return this.service.create(dto);
  }

  @Auth()
  @Patch(':id')
  @ApplySwagger(CertificationsSwagger.update)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCertificationDto) {
    return this.service.update(id, dto);
  }

  @Auth()
  @Get(':id/subjects')
  @ApplySwagger(CertificationsSwagger.findSubjects)
  findSubjects(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findSubjects(id);
  }
}
