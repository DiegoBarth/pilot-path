import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StudySessionResponseDto } from '../study-sessions/dto/study-session-response.dto';
import { ApiPaginatedResponse } from '../common/swagger/paginated-response.swagger';

export const StudyHistorySwagger = {

  findAll: applyDecorators(
    ApiTags('Study History'),

    ApiOperation({
      summary: 'Get study history',
      description: 'Returns paginated study sessions from the authenticated user with optional filters.'
    }),

    ApiQuery({
      name: 'certificationId',
      required: false,
      type: String,
      description: 'Filter by certification.'
    }),

    ApiQuery({
      name: 'subjectId',
      required: false,
      type: String,
      description: 'Filter by subject.'
    }),

    ApiQuery({
      name: 'from',
      required: false,
      type: String,
      description: 'Filter sessions from this date.',
      example: '2026-07-01'
    }),

    ApiQuery({
      name: 'to',
      required: false,
      type: String,
      description: 'Filter sessions until this date.',
      example: '2026-07-31'
    }),

    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      example: 1,
      description: 'Page number.'
    }),

    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      example: 20,
      description: 'Items per page.'
    }),

    ApiPaginatedResponse(StudySessionResponseDto),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

};