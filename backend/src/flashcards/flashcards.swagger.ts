import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { FlashcardResponseDto } from './dto/flashcard-response.dto';

export const FlashcardsSwagger = {

  create: applyDecorators(
    ApiTags('Flashcards'),

    ApiOperation({
      summary: 'Create flashcard',
      description: 'Creates a new flashcard associated with a subject.'
    }),

    ApiBody({
      type: CreateFlashcardDto
    }),

    ApiCreatedResponse({
      type: FlashcardResponseDto,
      description: 'Flashcard created successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Subject not found.'
    }),

    ApiConflictResponse({
      description: 'Flashcard already exists.'
    }),

    ApiForbiddenResponse({
      description: 'Only administrators can perform this action.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })

  ),

  findAll: applyDecorators(
    ApiTags('Flashcards'),

    ApiOperation({
      summary: 'List flashcards',
      description: 'Returns all active flashcards.'
    }),

    ApiQuery({
      name: 'subjectId',
      required: false,
      type: String,
      description: 'Filter flashcards by subject.'
    }),

    ApiOkResponse({
      type: FlashcardResponseDto,
      description: 'Flashcards retrieved successfully.',
      isArray: true
    })

  ),

  findOne: applyDecorators(
    ApiTags('Flashcards'),

    ApiOperation({
      summary: 'Get flashcard',
      description: 'Returns a flashcard by id.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Flashcard id.'
    }),

    ApiOkResponse({
      type: FlashcardResponseDto,
      description: 'Flashcard retrieved successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Flashcard not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};