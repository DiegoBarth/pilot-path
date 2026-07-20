import { ApiProperty } from '@nestjs/swagger';
import { QuestionDifficulty } from '@prisma/client';

export class DifficultyPerformanceDto {

  @ApiProperty({
    enum: QuestionDifficulty,
    example: QuestionDifficulty.EASY
  })
  difficulty!: QuestionDifficulty;

  @ApiProperty({ example: 42 })
  totalAnswers!: number;

  @ApiProperty({ example: 35 })
  correctAnswers!: number;

  @ApiProperty({ example: 83.33 })
  accuracy!: number;

}