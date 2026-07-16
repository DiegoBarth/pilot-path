import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({example: 'ok'})
  status!: string;

  @ApiProperty({example: 'pilot-path-api'})
  service!: string;

  @ApiProperty({example: '0.1.0'})
  version!: string;

  @ApiProperty({example: '2026-07-15T12:00:00.000Z'})
  timestamp!: string;
}