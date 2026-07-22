import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/** Certification fields without nested relations — breaks Swagger circular refs. */
export class CertificationSummaryDto {
  @Expose()
  @ApiProperty({ example: 'ad9a1afd-1bbc-4d0c-ac6e-c27aa12070b2' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'Airline Transport Pilot (PLA)' })
  name!: string;

  @Expose()
  @ApiProperty({ example: 'airline-transport-pilot' })
  slug!: string;

  @Expose()
  @ApiProperty({ example: 'Certification description', required: false })
  description?: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive!: boolean;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString?.() ?? value)
  @ApiProperty({ example: '2025-07-29T19:37:05.464Z' })
  updatedAt!: Date;

  @Exclude()
  deletedAt?: Date;
}
