import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateMockExamDto } from './dto/create-mock-exam.dto';
import { FinishMockExamDto } from './dto/finish-mock-exam.dto';
import { MockExamResponseDto } from './dto/mock-exam-response.dto';
import { MockExamSummaryResponseDto } from './dto/mock-exam-summary-response.dto';

export const MockExamsSwagger = {

  create: applyDecorators(
    ApiTags('Mock Exams'),

    ApiOperation({
      summary: 'Generate a mock exam',
      description: 'Creates a randomized mock exam using aviation questions.'
    }),

    ApiBody({
      type: CreateMockExamDto
    }),

    ApiCreatedResponse({
      type: MockExamResponseDto,
      description: 'Mock exam generated successfully.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findAll: applyDecorators(
    ApiTags('Mock Exams'),

    ApiOperation({
      summary: 'Get mock exam history',
      description: 'Returns the authenticated user mock exam history.'
    }),

    ApiOkResponse({
      type: MockExamSummaryResponseDto,
      isArray: true,
      description: 'Mock exams retrieved successfully.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findOne: applyDecorators(
    ApiTags('Mock Exams'),

    ApiOperation({
      summary: 'Get mock exam details',
      description: 'Returns a specific mock exam with questions and answers.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Mock exam id.'
    }),

    ApiOkResponse({
      type: MockExamResponseDto,
      description: 'Mock exam retrieved successfully.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  finish: applyDecorators(
    ApiTags('Mock Exams'),

    ApiOperation({
      summary: 'Finish mock exam',
      description: 'Submits answers, calculates score and stores exam result.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Mock exam id.'
    }),

    ApiBody({
      type: FinishMockExamDto
    }),

    ApiCreatedResponse({
      type: MockExamResponseDto,
      description: 'Mock exam finished successfully.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )

};