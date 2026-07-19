import { ApiProperty } from '@nestjs/swagger';

export class PerformanceTrendDto {

  @ApiProperty({ example: '2026-07' })
  period!: string;

  @ApiProperty({ example: 78.4 })
  accuracy!: number;

}