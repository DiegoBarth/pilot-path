import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudyType } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { CertificationSubjectResponseDto } from '../../certifications/dto/certification-subject-response.dto';

export class StudySessionResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  enrollmentId!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  certificationSubjectId!: string;

  @Expose()
  @ApiProperty({ enum: StudyType })
  studyType!: StudyType;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  startedAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  endedAt!: Date;

  @Expose()
  @ApiPropertyOptional({ nullable: true })
  notes?: string | null;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty()
  updatedAt!: Date;

  @Exclude()
  deletedAt?: Date | null;

  @Expose()
  @Type(() => CertificationSubjectResponseDto)
  @ApiProperty({ type: () => CertificationSubjectResponseDto })
  certificationSubject!: CertificationSubjectResponseDto;
}
