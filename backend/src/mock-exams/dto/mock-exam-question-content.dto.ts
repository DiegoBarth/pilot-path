import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionDifficulty } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { QuestionAlternativeResponseDto } from '../../questions/dto/question-alternative-response.dto';

export class MockExamQuestionContentDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  statement!: string;

  @Expose()
  @ApiPropertyOptional({ nullable: true })
  explanation?: string | null;

  @Expose()
  @ApiProperty({ enum: QuestionDifficulty })
  difficulty!: QuestionDifficulty;

  @Expose()
  @Type(() => QuestionAlternativeResponseDto)
  @ApiProperty({ type: [QuestionAlternativeResponseDto] })
  alternatives!: QuestionAlternativeResponseDto[];
}
