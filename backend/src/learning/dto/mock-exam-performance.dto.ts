import { ApiProperty } from '@nestjs/swagger';

import { MockExamScoreHistoryDto } from './mock-exam-score-history.dto';

export class MockExamPerformanceDto {

  @ApiProperty({ example: 12 })
  completedExams!: number;

  @ApiProperty({ example: 81.75 })
  averageScore!: number;

  @ApiProperty({ example: 75 })
  approvalRate!: number;

  @ApiProperty({ example: 96 })
  bestResult!: number;

  @ApiProperty({ example: 58 })
  worstResult!: number;

  @ApiProperty({ type: [MockExamScoreHistoryDto] })
  scoreHistory!: MockExamScoreHistoryDto[];

}