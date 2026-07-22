import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';

export class FlashcardResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty()
  answer!: string;

  @Expose()
  @ApiProperty()
  isActive!: boolean;

  @Expose()
  @Type(() => SubjectResponseDto)
  @ApiProperty({ type: SubjectResponseDto })
  subject!: SubjectResponseDto;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty()
  updatedAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ nullable: true })
  deletedAt?: Date | null;

  @Exclude()
  subjectId?: string;
}
