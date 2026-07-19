import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class CreateMockExamDto {

  @ApiProperty({
    example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14',
    description: 'Subject id.'
  })
  @IsUUID()
  subjectId!: string;

  @ApiProperty({
    example: 20,
    description: 'Number of questions.',
    minimum: 5,
    maximum: 100,
    required: false,
    default: 20,
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(100)
  questionCount?: number;

}