import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponseDto } from '../../subjects/dto/subject-response.dto';

export class CertificationSubjectResponseDto {

  @ApiProperty({format: 'uuid'})
  id!: string;

  @ApiProperty({format: 'uuid'})
  certificationId!: string;

  @ApiProperty({format: 'uuid'})
  subjectId!: string;

  @ApiProperty({example: 1})
  order!: number;

  @ApiProperty({example: true})
  required!: boolean;

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

  @ApiProperty({type: SubjectResponseDto})
  subject!: SubjectResponseDto;
}