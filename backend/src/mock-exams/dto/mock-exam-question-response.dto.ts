import { ApiProperty } from '@nestjs/swagger';

export class MockExamQuestionResponseDto {

  @ApiProperty()
  id!: string;

  @ApiProperty()
  statement!: string;

  @ApiProperty({
    type: [String],
    example: [
      'Alternative A',
      'Alternative B',
      'Alternative C',
      'Alternative D'
    ]
  })
  alternatives!: string[];

}