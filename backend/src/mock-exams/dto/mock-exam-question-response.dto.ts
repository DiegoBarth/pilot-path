import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { QuestionAlternativeResponseDto } from '../../questions/dto/question-alternative-response.dto';
import { MockExamQuestionContentDto } from './mock-exam-question-content.dto';

export class MockExamQuestionItemResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  questionId!: string;

  @Expose()
  @ApiProperty()
  displayOrder!: number;

  @Expose()
  @ApiPropertyOptional({ nullable: true })
  isCorrect?: boolean | null;

  @Expose()
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  selectedAlternativeId?: string | null;

  @Expose()
  @Type(() => MockExamQuestionContentDto)
  @ApiProperty({ type: MockExamQuestionContentDto })
  question!: MockExamQuestionContentDto;

  @Expose()
  @Type(() => QuestionAlternativeResponseDto)
  @ApiPropertyOptional({ type: QuestionAlternativeResponseDto, nullable: true })
  selectedAlternative?: QuestionAlternativeResponseDto | null;
}
