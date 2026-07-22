import { ApiProperty } from '@nestjs/swagger';
import { QuestionDifficulty } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';
import { QuestionAlternativeResponseDto } from './question-alternative-response.dto';

export class QuestionResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  statement!: string;

  @Expose()
  @ApiProperty({ nullable: true })
  explanation?: string;

  @Expose()
  @ApiProperty({ enum: QuestionDifficulty })
  difficulty!: QuestionDifficulty;

  @Expose()
  @ApiProperty()
  isActive!: boolean;

  @Expose()
  @Type(() => SubjectResponseDto)
  @ApiProperty({ type: SubjectResponseDto })
  subject!: SubjectResponseDto;

  @Expose()
  @Type(() => QuestionAlternativeResponseDto)
  @ApiProperty({ type: [QuestionAlternativeResponseDto] })
  alternatives!: QuestionAlternativeResponseDto[];

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty()
  createdAt!: Date;

  @Exclude()
  deletedAt?: Date;

  @Exclude()
  subjectId?: string;
}
