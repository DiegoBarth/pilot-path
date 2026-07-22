import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Mood, StudyType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateStudySessionBySubjectDto {
  @ApiProperty({ example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14' })
  @IsUUID()
  subjectId!: string;

  @ApiPropertyOptional({ example: 'b2db0b51-3cf8-4c1c-a8d7-2a0c8bbf2b37' })
  @IsOptional()
  @IsUUID()
  certificationId?: string;

  @ApiProperty({ example: '2026-07-16T19:30:00.000Z' })
  @IsDateString()
  startedAt!: string;

  @ApiProperty({ example: '2026-07-16T19:45:00.000Z' })
  @IsDateString()
  endedAt!: string;

  @ApiProperty({ enum: StudyType, example: StudyType.FLASHCARDS })
  @IsEnum(StudyType)
  studyType!: StudyType;

  @ApiPropertyOptional({ enum: Mood, example: Mood.GOOD })
  @IsOptional()
  @IsEnum(Mood)
  mood?: Mood;

  @ApiPropertyOptional({ example: '3 flashcards revisados, 2 acertos.', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
