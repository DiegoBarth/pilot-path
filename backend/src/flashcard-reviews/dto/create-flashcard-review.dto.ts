import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreateFlashcardReviewDto {

  @ApiProperty({
    description: 'Indicates whether the flashcard answer was correct.',
    example: true
  })
  @IsBoolean()
  correct!: boolean;

}