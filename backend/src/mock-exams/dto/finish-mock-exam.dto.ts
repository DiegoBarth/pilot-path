import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FinishMockExamAnswerDto {

  @ApiProperty({ example: '8c4ad584-b7bf-4c3f-9985-74ad4c474634' })
  @IsUUID()
  questionId!: string;

  @ApiProperty({ example: 'a54e51de-57a0-4ee5-b44d-2a8194765971' })
  @IsUUID()
  alternativeId!: string;

}

export class FinishMockExamDto {

  @ApiProperty({ type: [FinishMockExamAnswerDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FinishMockExamAnswerDto)
  answers!: FinishMockExamAnswerDto[];

  @ApiProperty({
    example: 1265,
    description: 'Time spent to complete the mock exam, in seconds.'
  })
  @IsInt()
  @Min(1)
  duration!: number;

}