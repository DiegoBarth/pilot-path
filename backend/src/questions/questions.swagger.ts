import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
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

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

export const QuestionsSwagger = {

  create: applyDecorators(
    ApiTags('Questions'),

    ApiOperation({
      summary: 'Create a question',
      description: 'Creates a new question associated with a subject.'
    }),

    ApiBody({
      type: CreateQuestionDto
    }),

    ApiCreatedResponse({
      type: QuestionResponseDto,
      description: 'Question created successfully.'
    }),

    ApiBadRequestResponse({
      description: 'Invalid question data. A question must contain exactly one correct alternative and alternative letters must be unique.'
    }),

    ApiConflictResponse({
      description: 'Question already exists for this subject.'
    }),

    ApiNotFoundResponse({
      description: 'Subject not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findAll: applyDecorators(
    ApiTags('Questions'),

    ApiOperation({
      summary: 'Get questions',
      description: 'Returns all active questions.'
    }),

    ApiOkResponse({
      type: QuestionResponseDto,
      description: 'Questions retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findOne: applyDecorators(
    ApiTags('Questions'),

    ApiOperation({
      summary: 'Get question',
      description: 'Returns a question by id.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Question id.'
    }),

    ApiOkResponse({
      type: QuestionResponseDto,
      description: 'Question retrieved successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Question not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};