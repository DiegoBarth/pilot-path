import { ApiProperty } from '@nestjs/swagger';

import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';

export class FlashcardResponseDto {

  @ApiProperty({ example: 'b2db0b51-3cf8-4c1c-a8d7-2a0c8bbf2b37' })
  id!: string;

  @ApiProperty({ example: 'What does METAR stand for?' })
  question!: string;

  @ApiProperty({ example: 'Meteorological Aerodrome Report.' })
  answer!: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ type: SubjectResponseDto })
  subject!: SubjectResponseDto;

  @ApiProperty({ example: '2026-07-17T13:45:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-07-17T13:45:00.000Z' })
  updatedAt!: Date;

  @ApiProperty({
    example: null,
    nullable: true
  })
  deletedAt?: Date;

}