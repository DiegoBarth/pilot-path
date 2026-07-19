import { ApiProperty } from '@nestjs/swagger';

export class SubjectPerformanceDto {

  @ApiProperty()
  subjectId!: string;

  @ApiProperty()
  subjectName!: string;

  @ApiProperty({ example: 82.5 })
  accuracy!: number;

  @ApiProperty({ example: 42 })
  totalAnswers!: number;

}