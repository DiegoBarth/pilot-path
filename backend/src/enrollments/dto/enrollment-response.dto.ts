import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentStatus } from '@prisma/client';

import { CertificationResponseDto } from '../../certifications/dto/certification-response.dto';

export class EnrollmentResponseDto {

  @ApiProperty({format: 'uuid'})
  id!: string;

  @ApiProperty({format: 'uuid'})
  userId!: string;

  @ApiProperty({format: 'uuid'})
  certificationId!: string;

  @ApiProperty({
    enum: EnrollmentStatus,
    enumName: 'EnrollmentStatus'
  })
  status!: EnrollmentStatus;

  @ApiProperty({
    type: String,
    format: 'date-time',
    nullable: true
  })
  targetExamDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date-time'
  })
  startedAt!: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    nullable: true
  })
  completedAt?: Date;

  @ApiProperty({
    type: String,
    format: 'date-time'
  })
  createdAt!: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  updatedAt!: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    nullable: true
  })
  deletedAt?: Date;

  @ApiProperty({type: CertificationResponseDto})
  certification!: CertificationResponseDto;
}