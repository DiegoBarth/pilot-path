import { ApiProperty } from '@nestjs/swagger';

export class SubjectResponseDto {
  @ApiProperty({format: 'uuid'})
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty({nullable: true})
  description?: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({
    type: String,
    format: 'date-time'
  })
  createdAt!: Date;

  @ApiProperty({
    type: String,
    format: 'date-time'
  })
  updatedAt!: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    nullable: true
  })
  deletedAt?: Date;
}