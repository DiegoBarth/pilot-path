import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateFlashcardDto {

  @ApiProperty({
    description: 'Subject identifier.',
    example: '8e1eac60-8958-458e-ba0a-103136bee31b'
  })
  @IsUUID()
  subjectId!: string;

  @ApiProperty({
    description: 'Flashcard question.',
    example: 'What does METAR stand for?'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  question!: string;

  @ApiProperty({
    description: 'Flashcard answer.',
    example: 'Meteorological Aerodrome Report.'
  })
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  answer!: string;

}