import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';
import { CertificationSummaryDto } from './certification-summary.dto';

export class CertificationSubjectResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  certificationId!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  subjectId!: string;

  @Expose()
  @ApiProperty({ example: 1 })
  displayOrder!: number;

  @Expose()
  @ApiProperty({ example: true })
  isRequired!: boolean;

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

  @Expose()
  @Type(() => SubjectResponseDto)
  @ApiProperty({ type: SubjectResponseDto })
  subject?: SubjectResponseDto;

  @Expose()
  @Type(() => CertificationSummaryDto)
  @ApiProperty({ type: CertificationSummaryDto, required: false })
  certification?: CertificationSummaryDto;
}
