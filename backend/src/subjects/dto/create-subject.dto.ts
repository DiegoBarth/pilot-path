import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({example: 'Meteorology'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({example: 'meteorology'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  slug!: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: 'Weather theory for pilot training.'
  })
  @IsString()
  @MaxLength(500)
  description?: string;
}