import { ApiProperty } from '@nestjs/swagger';

export class WeakSubjectDto {

  @ApiProperty()
  subjectId!: string;

  @ApiProperty()
  subjectName!: string;

  @ApiProperty({ example: 48.2 })
  accuracy!: number;

}