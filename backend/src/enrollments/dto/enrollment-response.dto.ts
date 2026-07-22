import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentStatus } from '@prisma/client';
import { CertificationSummaryDto } from '../../certifications/dto/certification-summary.dto';

/** Enrollment fields without nested certification.enrollments cycle. */
export class EnrollmentSummaryDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  certificationId!: string;

  @Expose()
  @ApiProperty({ enum: EnrollmentStatus, enumName: 'EnrollmentStatus' })
  status!: EnrollmentStatus;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  targetExamDate?: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  startedAt!: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  completedAt?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;

  @Exclude()
  deletedAt?: Date;
}

export class EnrollmentResponseDto extends EnrollmentSummaryDto {
  @Expose()
  @Type(() => CertificationSummaryDto)
  @ApiProperty({ type: () => CertificationSummaryDto, required: false })
  certification?: CertificationSummaryDto;
}
