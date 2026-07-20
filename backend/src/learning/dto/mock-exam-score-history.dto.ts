import { ApiProperty } from '@nestjs/swagger';

export class MockExamScoreHistoryDto {

  @ApiProperty({ example: '2026-07' })
  period!: string;

  @ApiProperty({ example: 78.5 })
  averageScore!: number;

}