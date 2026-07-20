

import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LearningStatisticsDto } from './dto/learning-statistics.dto';
import { FlashcardPerformanceDto } from './dto/flashcard-performance.dto';
import { QuestionPerformanceDto } from './dto/question-performance.dto';
import { MockExamPerformanceDto } from './dto/mock-exam-performance.dto';

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
  ),

  questions: applyDecorators(
    ApiTags('Learning Statistics'),

    ApiOperation({
      summary: 'Get question performance statistics',
      description: 'Returns question bank performance statistics for the authenticated user.'
    }),

    ApiOkResponse({
      type: QuestionPerformanceDto,
      description: 'Question performance statistics successfully retrieved.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    }),
  ),

  mockExams: applyDecorators(
    ApiTags('Learning Statistics'),

    ApiOperation({
      summary: 'Get mock exam performance statistics',
      description: 'Returns mock exam performance statistics for the authenticated user.'
    }),

    ApiOkResponse({
      type: MockExamPerformanceDto,
      description: 'Mock exam performance statistics successfully retrieved.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    }),
  ),

};