import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Mood, StudyType } from '@prisma/client';

class StudyHistoryCertificationDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  name!: string;
}

class StudyHistorySubjectDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  name!: string;
}

export class StudyHistoryItemResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  startedAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  endedAt!: Date;

  @ApiProperty({ enum: StudyType })
  studyType!: StudyType;

  @ApiPropertyOptional({ enum: Mood, nullable: true })
  mood?: Mood | null;

  @ApiPropertyOptional({ nullable: true })
  notes?: string | null;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: () => StudyHistoryCertificationDto })
  certification!: StudyHistoryCertificationDto;

  @ApiProperty({ type: () => StudyHistorySubjectDto })
  subject!: StudyHistorySubjectDto;
}
