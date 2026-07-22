import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuestionAlternativeResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  letter!: string;

  @Expose()
  @ApiProperty()
  content!: string;
}
