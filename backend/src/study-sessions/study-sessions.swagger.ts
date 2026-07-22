import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { CreateStudySessionDto } from './dto/create-study-session.dto';
import { CreateStudySessionBySubjectDto } from './dto/create-study-session-by-subject.dto';
import { StudySessionResponseDto } from './dto/study-session-response.dto';
import { applyDecorators } from '@nestjs/common';

export const StudySessionsSwagger = {
  create: applyDecorators(
    ApiTags('Study Sessions'),

    ApiOperation({
      summary: 'Create a study session',
      description: 'Registers a new study session for the authenticated user.'
    }),

    ApiBody({
      type: CreateStudySessionDto
    }),

    ApiCreatedResponse({
      type: StudySessionResponseDto,
      description: 'Study session created successfully.'
    }),

    ApiBadRequestResponse({
      description: 'You are not enrolled in this certification or the end date must be after the start date.'
    }),

    ApiNotFoundResponse({
      description: 'Certification subject not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  createBySubject: applyDecorators(
    ApiTags('Study Sessions'),

    ApiOperation({
      summary: 'Create a study session by subject',
      description:
        'Registers a study session resolving the certification subject from subjectId and optional certificationId.',
    }),

    ApiBody({
      type: CreateStudySessionBySubjectDto,
    }),

    ApiCreatedResponse({
      type: StudySessionResponseDto,
      description: 'Study session created successfully.',
    }),

    ApiBadRequestResponse({
      description: 'You are not enrolled in this certification or the end date must be after the start date.',
    }),

    ApiNotFoundResponse({
      description: 'Subject or enrollment not found.',
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.',
    }),
  ),

  findAll: applyDecorators(
    ApiTags('Study Sessions'),

    ApiOperation({
      summary: 'List study sessions',
      description: 'Returns all study sessions for the authenticated user.'
    }),

    ApiOkResponse({
      type: StudySessionResponseDto,
      description: 'Study sessions retrieved successfully.',
      isArray: true
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  ),

  findOne: applyDecorators(
    ApiTags('Study Sessions'),

    ApiOperation({
      summary: 'Get study session',
      description: 'Returns a study session by id.'
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'Study session id.'
    }),

    ApiOkResponse({
      type: StudySessionResponseDto,
      description: 'Study session retrieved successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Study session not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })
  )
}