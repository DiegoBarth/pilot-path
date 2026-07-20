import { ApiProperty } from '@nestjs/swagger';
import { DifficultyPerformanceDto } from './difficulty-performance.dto';

export class QuestionPerformanceDto {

  @ApiProperty({ example: 180 })
  totalAnswers!: number;

  @ApiProperty({ example: 142 })
  correctAnswers!: number;

  @ApiProperty({ example: 38 })
  wrongAnswers!: number;

  @ApiProperty({ example: 78.89 })
  accuracy!: number;

  @ApiProperty({ type: [DifficultyPerformanceDto] })
  performanceByDifficulty!: DifficultyPerformanceDto[];

}