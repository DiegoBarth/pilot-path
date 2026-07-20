import { ApiProperty } from '@nestjs/swagger';
import { FlashcardReviewHistoryDto } from './flashcard-review-history.dto';

export class FlashcardPerformanceDto {

  @ApiProperty({ example: 240 })
  totalReviews!: number;

  @ApiProperty({ example: 195 })
  correctAnswers!: number;

  @ApiProperty({ example: 45 })
  wrongAnswers!: number;

  @ApiProperty({ example: 81.25 })
  accuracy!: number;

  @ApiProperty({ type: [FlashcardReviewHistoryDto] })
  reviewHistory!: FlashcardReviewHistoryDto[];

}