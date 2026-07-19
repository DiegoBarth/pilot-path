import { ApiProperty } from '@nestjs/swagger';
import { MockExamQuestionResponseDto } from './mock-exam-question-response.dto';

export class MockExamResponseDto {

  @ApiProperty()
  id!: string;

  @ApiProperty()
  subjectId!: string;

  @ApiProperty()
  totalQuestions!: number;

  @ApiProperty()
  startedAt!: Date;

  @ApiProperty({ type: [MockExamQuestionResponseDto] })
  questions!: MockExamQuestionResponseDto[];

}