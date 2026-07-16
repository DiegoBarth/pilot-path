import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCertificationDto {

  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @MinLength(3)
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}