import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CertificationSummaryDto } from './certification-summary.dto';
import { EnrollmentSummaryDto } from '../../enrollments/dto/enrollment-response.dto';

export class CertificationResponseDto extends CertificationSummaryDto {
  @Expose()
  @Type(() => EnrollmentSummaryDto)
  @ApiProperty({ type: () => EnrollmentSummaryDto, isArray: true, required: false })
  enrollments?: EnrollmentSummaryDto[];
}
