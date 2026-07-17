import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateFlashcardReviewDto } from './dto/create-flashcard-review.dto';
import { FlashcardReviewResponseDto } from './dto/flashcard-review-response.dto';

export const FlashcardReviewsSwagger = {

  review: applyDecorators(
    ApiTags('Flashcard Reviews'),

    ApiOperation({
      summary: 'Review a flashcard',
      description: 'Registers a flashcard review and updates user progress.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Flashcard id.'
    }),

    ApiBody({
      type: CreateFlashcardReviewDto
    }),

    ApiOkResponse({
      type: FlashcardReviewResponseDto,
      description: 'Flashcard review registered successfully.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findReviews: applyDecorators(
    ApiTags('Flashcard Reviews'),

    ApiOperation({
      summary: 'Get flashcard review history',
      description: 'Returns the authenticated user flashcard review history.'
    }),

    ApiOkResponse({
      type: FlashcardReviewResponseDto,
      description: 'Flashcard reviews retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};