import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { QuestionAnswerResponseDto } from './dto/question-answer-response.dto';

export const QuestionPracticeSwagger = {

  history: applyDecorators(
    ApiTags('Question Practice'),

    ApiOperation({
      summary: 'Get question answer history',
      description: 'Returns the authenticated user question answer history.'
    }),

    ApiOkResponse({
      type: QuestionAnswerResponseDto,
      description: 'Question history retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  answer: applyDecorators(
    ApiTags('Question Practice'),

    ApiOperation({
      summary: 'Answer a question',
      description: 'Stores the user answer, calculates correctness and saves the attempt history.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Question id.'
    }),

    ApiBody({
      type: CreateQuestionAnswerDto
    }),

    ApiCreatedResponse({
      type: QuestionAnswerResponseDto,
      description: 'Question answer registered successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Question not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};