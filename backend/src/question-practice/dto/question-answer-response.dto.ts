import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class QuestionAnswerResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  questionId!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  selectedAlternativeId!: string;

  @Expose()
  @ApiProperty()
  isCorrect!: boolean;

  @Expose()
  @ApiProperty({ description: 'Response time in seconds.' })
  responseTime!: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  answeredAt!: Date;

  @Exclude()
  userId?: string;
}
