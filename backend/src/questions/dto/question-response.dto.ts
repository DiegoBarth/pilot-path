import { ApiProperty } from '@nestjs/swagger';
import { QuestionDifficulty } from '@prisma/client';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';
import { QuestionAlternativeResponseDto } from './question-alternative-response.dto';

export class QuestionResponseDto {

  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  statement!: string;

  @ApiProperty({ nullable: true })
  explanation?: string;

  @ApiProperty({ enum: QuestionDifficulty })
  difficulty!: QuestionDifficulty;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ type: SubjectResponseDto })
  subject!: SubjectResponseDto;

  @ApiProperty({ type: [QuestionAlternativeResponseDto] })
  alternatives!: QuestionAlternativeResponseDto[];

  @ApiProperty()
  createdAt!: Date;

}