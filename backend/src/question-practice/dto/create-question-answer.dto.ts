import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateQuestionAnswerDto {

  @ApiProperty({
    example: '6b6d8f15-c76c-4b5a-9a92-7b95a82e2b14',
    description: 'Selected question alternative id.'
  })
  @IsUUID()
  alternativeId!: string;

  @ApiProperty({
    example: 25,
    description: 'Response time in seconds.'
  })
  @IsInt()
  @Min(1)
  responseTime!: number;

}