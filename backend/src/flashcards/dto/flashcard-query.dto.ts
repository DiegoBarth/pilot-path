import { IsOptional, IsUUID } from 'class-validator';

export class FlashcardQueryDto {
  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @IsOptional()
  @IsUUID()
  certificationId?: string;
}
