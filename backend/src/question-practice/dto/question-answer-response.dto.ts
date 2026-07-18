import { ApiProperty } from '@nestjs/swagger';

export class QuestionAnswerResponseDto {

  @ApiProperty({
    example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14'
  })
  id!: string;

  @ApiProperty({
    example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14'
  })
  questionId!: string;

  @ApiProperty({
    example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14'
  })
  selectedAlternativeId!: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the selected alternative was correct.'
  })
  isCorrect!: boolean;

  @ApiProperty({
    example: 25,
    description: 'Response time in seconds.'
  })
  responseTime!: number;

  @ApiProperty({
    example: '2026-07-18T20:00:00.000Z'
  })
  answeredAt!: Date;

}