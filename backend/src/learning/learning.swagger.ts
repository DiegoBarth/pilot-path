

import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LearningStatisticsDto } from './dto/learning-statistics.dto';
import { FlashcardPerformanceDto } from './dto/flashcard-performance.dto';

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
  ),

  flashcards: applyDecorators(
    ApiTags('Learning Statistics'),

    ApiOperation({
      summary: 'Get flashcard performance statistics',
      description: 'Returns flashcard learning performance statistics for the authenticated user.'
    }),

    ApiOkResponse({
      type: FlashcardPerformanceDto,
      description: 'Flashcard performance statistics successfully retrieved.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    }),
  )

};