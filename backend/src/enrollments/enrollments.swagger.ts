import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { EnrollmentResponseDto } from './dto/enrollment-response.dto';

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