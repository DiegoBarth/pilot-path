

import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LearningStatisticsDto } from './dto/learning-statistics.dto';

export const LearningStatisticsSwagger = {

  statistics: applyDecorators(
    ApiTags('Learning Statistics'),

    ApiOperation({
      summary: 'Get learning statistics',
      description: 'Returns aggregated learning statistics based on flashcards, questions and mock exams.'
    }),

    ApiOkResponse({
      description: 'Learning statistics successfully retrieved.',
      type: LearningStatisticsDto,
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};