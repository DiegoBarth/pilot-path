import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsUUID } from 'class-validator';

export class FlashcardReviewResponseDto {

  @ApiProperty({ example: '8f6d8b5a-7b12-4f7d-8e7c-7e6f3b8a1234' })
  @IsUUID()
  id!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isCorrect!: boolean;

  @ApiProperty({ example: '2026-07-17T18:30:00.000Z' })
  @IsDateString()
  reviewedAt!: string;

  @ApiProperty({ example: '8f6d8b5a-7b12-4f7d-8e7c-7e6f3b8a1234' })
  @IsUUID()
  userFlashcardId!: string;

}