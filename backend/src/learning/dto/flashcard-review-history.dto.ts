import { ApiProperty } from '@nestjs/swagger';

export class FlashcardReviewHistoryDto {

  @ApiProperty({ example: '2026-07' })
  period!: string;

  @ApiProperty({ example: 34 })
  reviews!: number;

}