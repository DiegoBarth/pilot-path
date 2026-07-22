import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCertificationDto {
  @ApiProperty({ example: 'Private Pilot License' })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({ example: 'private-pilot-license' })
  @IsString()
  @MinLength(3)
  slug!: string;

  @ApiPropertyOptional({ example: 'Certification description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
