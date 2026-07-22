import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';

export class MockExamSummaryResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  subjectId?: string | null;

  @Expose()
  @ApiProperty()
  score!: number;

  @Expose()
  @ApiProperty()
  totalQuestions!: number;

  @Expose()
  @ApiProperty()
  correctAnswers!: number;

  @Expose()
  @ApiProperty()
  passingScore!: number;

  @Expose()
  @ApiProperty()
  passed!: boolean;

  @Expose()
  @ApiPropertyOptional({ nullable: true })
  duration?: number | null;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  startedAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiPropertyOptional({ type: String, format: 'date-time', nullable: true })
  finishedAt?: Date | null;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;

  @Expose()
  @Type(() => SubjectResponseDto)
  @ApiPropertyOptional({ type: SubjectResponseDto })
  subject?: SubjectResponseDto;

  @Exclude()
  userId?: string;

  @Exclude()
  deletedAt?: Date | null;
}
