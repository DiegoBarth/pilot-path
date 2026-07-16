import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { SubjectResponseDto } from './dto/subject-response.dto';
import { applyDecorators } from '@nestjs/common';

export const SubjectsSwagger = {
  create: applyDecorators(
    ApiTags('Subjects'),

    ApiOperation({
      summary: 'Create subject',
      description: 'Creates a new aviation subject.'
    }),

    ApiCreatedResponse({
      type: SubjectResponseDto,
      description: 'Subject created successfully.'
    }),

    ApiConflictResponse({
      description: 'Subject slug already exists.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findAll: applyDecorators(
    ApiTags('Subjects'),
    ApiBearerAuth('JWT-auth'),

    ApiOperation({
      summary: 'List subjects',
      description: 'Returns all active subjects.'
    }),

    ApiOkResponse({
      type: SubjectResponseDto,
      description: 'Subjects retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )
}