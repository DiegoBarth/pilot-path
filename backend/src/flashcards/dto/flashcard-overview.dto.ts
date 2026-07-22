import { ApiProperty } from '@nestjs/swagger';

export class FlashcardOverviewDto {
  @ApiProperty({ example: 12 })
  dueTodayCount!: number;

  @ApiProperty({ example: 5 })
  reviewedTodayCount!: number;

  @ApiProperty({ example: 82.5 })
  accuracyRate!: number;

  @ApiProperty({ example: 12 })
  availableCount!: number;

  @ApiProperty({ example: 15 })
  totalCount!: number;
}
