import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { EnrollmentResponseDto } from './dto/enrollment-response.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

export const EnrollmentsSwagger = {
  enroll: applyDecorators(
    ApiTags('Enrollments'),

    ApiOperation({
      summary: 'Enroll in a certification',
      description: 'Creates an enrollment for the authenticated user in the specified certification.'
    }),

    ApiCreatedResponse({
      type: EnrollmentResponseDto,
      description: 'Enrollment created successfully.'
    }),

    ApiConflictResponse({
      description: 'User is already enrolled in this certification.'
    }),

    ApiNotFoundResponse({
      description: 'Certification not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  cancel: applyDecorators(
    ApiTags('Enrollments'),

    ApiOperation({
      summary: 'Cancel certification enrollment',
      description: 'Cancels the authenticated user enrollment in the specified certification by changing its status to DROPPED. The enrollment record is preserved and can be reactivated later by enrolling in the certification again.'
    }),

    ApiParam({
      name: 'id',
      description: 'Enrollment UUID',
      example: '93c00914-8d73-414b-a59b-090a4a2aed48'
    }),

    ApiOkResponse({
      type: EnrollmentResponseDto,
      description: 'Enrollment cancelled successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Enrollment not found or does not belong to the authenticated user.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    }),
  ),

  findAll: applyDecorators(
    ApiTags('Enrollments'),

    ApiOperation({
      summary: 'List user enrollments',
      description: 'Returns all enrollments for the authenticated user.'
    }),

    ApiOkResponse({
      type: EnrollmentResponseDto,
      description: 'Enrollments retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findOne: applyDecorators(
    ApiTags('Enrollments'),

    ApiOperation({
      summary: 'Get enrollment by ID',
      description: 'Returns a specific enrollment for the authenticated user.'
    }),

    ApiOkResponse({
      type: EnrollmentResponseDto,
      description: 'Enrollment retrieved successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Enrollment not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )
}