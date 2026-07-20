import { ApiProperty } from '@nestjs/swagger';

export class SubjectAnalyticsDto {

  @ApiProperty({ example: '8f82688a-d226-4f49-8168-fc2f9058ede1' })
  subjectId!: string;

  @ApiProperty({ example: 'Meteorology' })
  subjectName!: string;

  @ApiProperty({ example: 82.35 })
  questionAccuracy!: number;

  @ApiProperty({ example: 34 })
  questionsAnswered!: number;

  @ApiProperty({ example: 91.67 })
  flashcardAccuracy!: number;

  @ApiProperty({ example: 48 })
  flashcardsReviewed!: number;

  @ApiProperty({ example: 87.01 })
  overallAccuracy!: number;

}