import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Mood, StudyType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateStudySessionDto {
  @ApiProperty({ example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14' })
  @IsUUID()
  certificationSubjectId!: string;

  @ApiProperty({
    description: 'Study session start date and time.',
    example: '2026-07-16T19:30:00.000Z'
  })
  @IsDateString()
  startedAt!: string;

  @ApiProperty({
    description: 'Study session end date and time.',
    example: '2026-07-16T21:00:00.000Z'
  })
  @IsDateString()
  endedAt!: string;

  @ApiProperty({
    enum: StudyType,
    example: StudyType.READING
  })
  @IsEnum(StudyType)
  studyType!: StudyType;

  @ApiPropertyOptional({
    enum: Mood,
    example: Mood.GOOD
  })
  @IsOptional()
  @IsEnum(Mood)
  mood?: Mood;

  @ApiPropertyOptional({
    example: 'Reviewed METAR decoding and cold fronts.',
    maxLength: 1000
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}