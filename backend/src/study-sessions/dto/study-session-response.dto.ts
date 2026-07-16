import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudyType } from '@prisma/client';
import { CertificationSubjectResponseDto } from '../../certifications/dto/certification-subject-response.dto';

export class StudySessionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  enrollmentId!: string;

  @ApiProperty()
  certificationSubjectId!: string;

  @ApiProperty({ enum: StudyType })
  studyType!: StudyType;

  @ApiProperty({ example: 90 })
  duration!: number;

  @ApiProperty()
  studiedAt!: Date;

  @ApiPropertyOptional()
  notes?: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiPropertyOptional()
  deletedAt?: Date | null;

  @ApiProperty({ type: () => CertificationSubjectResponseDto })
  certificationSubject!: CertificationSubjectResponseDto;
}