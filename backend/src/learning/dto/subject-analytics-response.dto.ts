import { ApiProperty } from '@nestjs/swagger';
import { SubjectAnalyticsDto } from './subject-analytics.dto';
import { WeakSubjectDto } from './weak-subject.dto';

export class SubjectAnalyticsResponseDto {

  @ApiProperty({ type: [SubjectAnalyticsDto] })
  subjects!: SubjectAnalyticsDto[];

  @ApiProperty({ type: [WeakSubjectDto] })
  weakSubjects!: WeakSubjectDto[];

}