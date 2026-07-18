import { ApiProperty } from '@nestjs/swagger';

export class QuestionAlternativeResponseDto {

  @ApiProperty({format: 'uuid'})
  id!: string;

  @ApiProperty()
  letter!: string;

  @ApiProperty()
  content!: string;

}