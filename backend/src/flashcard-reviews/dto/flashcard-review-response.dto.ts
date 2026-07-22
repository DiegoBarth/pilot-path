import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class FlashcardReviewResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  isCorrect!: boolean;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ type: String, format: 'date-time' })
  reviewedAt!: Date;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  userFlashcardId!: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;
}
