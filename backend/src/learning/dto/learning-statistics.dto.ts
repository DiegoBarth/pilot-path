import { ApiProperty } from '@nestjs/swagger';

import { PerformanceTrendDto } from './performance-trend.dto';
import { SubjectPerformanceDto } from './subject-performance.dto';
import { WeakSubjectDto } from './weak-subject.dto';

export class LearningStatisticsDto {

  @ApiProperty({ example: 86.2 })
  flashcardAccuracy!: number;

  @ApiProperty({ example: 74.8 })
  questionAccuracy!: number;

  @ApiProperty({ example: 81.5 })
  mockExamPerformance!: number;

  @ApiProperty({ type: [SubjectPerformanceDto] })
  subjectPerformance!: SubjectPerformanceDto[];

  @ApiProperty({ type: [WeakSubjectDto] })
  weakSubjects!: WeakSubjectDto[];

  @ApiProperty({ type: [PerformanceTrendDto] })
  performanceTrends!: PerformanceTrendDto[];

}