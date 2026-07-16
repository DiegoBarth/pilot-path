import { applyDecorators } from '@nestjs/common';
import {
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
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { CertificationResponseDto } from './dto/certification-response.dto';
import { CertificationSubjectResponseDto } from './dto/certification-subject-response.dto';

export const CertificationsSwagger = {

  findAll: applyDecorators(
    ApiTags('Certifications'),

    ApiOperation({
      summary: 'List certifications',
      description: 'Returns all active aviation certifications available in PilotPath.'
    }),

    ApiOkResponse({
      type: CertificationResponseDto,
      description: 'List of available certifications returned successfully.',
      isArray: true
    })
  ),

  findOne: applyDecorators(
    ApiTags('Certifications'),

    ApiOperation({
      summary: 'Get certification details',
      description: 'Returns detailed information about a specific certification.'
    }),

    ApiParam({
      name: 'id',
      description: 'Certification UUID',
      example: '93c00914-8d73-414b-a59b-090a4a2aed48'
    }),

    ApiOkResponse({
      type: CertificationResponseDto,
      description: 'Certification found successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Certification not found.'
    }),
  ),

  create: applyDecorators(
    ApiTags('Certifications'),

    ApiOperation({
      summary: 'Create certification',
      description: 'Creates a new aviation certification.'
    }),

    ApiBody({
      type: CreateCertificationDto,
      examples: {
        example: {
          summary: 'Private Pilot License',
          value: {
            name: 'Private Pilot License',
            slug: 'private-pilot-license',
            description: 'Initial pilot certification allowing private operations.',
            isActive: true
          }
        }
      }
    }),

    ApiCreatedResponse({
      type: CertificationResponseDto,
      description: 'Certification created successfully.'
    }),

    ApiConflictResponse({
      description: 'Certification already exists.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })

  ),

  update: applyDecorators(
    ApiTags('Certifications'),

    ApiOperation({
      summary: 'Update certification',
      description: 'Updates an existing certification.'
    }),

    ApiParam({
      name: 'id',
      description: 'Certification UUID',
      example: '93c00914-8d73-414b-a59b-090a4a2aed48'
    }),

    ApiBody({
      type: UpdateCertificationDto,
      examples: {
        example: {
          summary: 'Update certification',
          value: {
            description: 'Updated certification description.',
            isActive: true
          }
        }
      }
    }),

    ApiOkResponse({
      type: CertificationResponseDto,
      description: 'Certification updated successfully.'
    }),

    ApiNotFoundResponse({
      description: 'Certification not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    })

  ),

  findSubjects: applyDecorators(
    ApiTags('Certifications'),

    ApiOperation({
      summary: 'Get certification curriculum',
      description: 'Returns the curriculum of a certification, including subject order and requirement information.'
    }),

    ApiOkResponse({
      type: CertificationSubjectResponseDto,
      description: 'Certification subjects retrieved successfully.',
      isArray: true
    }),

    ApiNotFoundResponse({
      description: 'Certification not found.'
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized.'
    }),
  )

}