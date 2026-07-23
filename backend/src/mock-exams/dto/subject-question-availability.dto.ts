import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubjectQuestionAvailabilityDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  subjectId!: string;

  @Expose()
  @ApiProperty({ example: 42 })
  questionCount!: number;
}
