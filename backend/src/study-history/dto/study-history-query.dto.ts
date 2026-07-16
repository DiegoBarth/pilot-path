import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class StudyHistoryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Certification id.' })
  @IsOptional()
  @IsUUID()
  certificationId?: string;

  @ApiPropertyOptional({ description: 'Subject id.' })
  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @ApiPropertyOptional({
    description: 'Initial date.',
    example: '2026-07-01'
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'Final date.',
    example: '2026-07-31'
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}