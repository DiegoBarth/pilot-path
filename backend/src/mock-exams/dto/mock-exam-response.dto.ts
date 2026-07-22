import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MockExamQuestionItemResponseDto } from './mock-exam-question-response.dto';
import { MockExamSummaryResponseDto } from './mock-exam-summary-response.dto';

export class MockExamResponseDto extends MockExamSummaryResponseDto {
  @Expose()
  @Type(() => MockExamQuestionItemResponseDto)
  @ApiProperty({ type: [MockExamQuestionItemResponseDto] })
  questions!: MockExamQuestionItemResponseDto[];
}
