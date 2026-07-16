import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

export class CertificationsSwagger {

  static tags() {
    return applyDecorators(
      ApiTags('Certifications')
    );
  }

  static findAll() {
    return applyDecorators(
      ApiOperation({
        summary: 'List certifications',
        description: 'Returns all active aviation certifications available in PilotPath.'
      }),

      ApiResponse({
        status: 200,
        description: 'List of available certifications returned successfully.'
      })
    );
  }

  static findOne() {
    return applyDecorators(
      ApiOperation({
        summary: 'Get certification details',
        description: 'Returns detailed information about a specific certification.'
      }),

      ApiParam({
        name: 'id',
        description: 'Certification UUID',
        example: '93c00914-8d73-414b-a59b-090a4a2aed48'
      }),

      ApiResponse({
        status: 200,
        description: 'Certification found successfully.'
      }),

      ApiResponse({
        status: 404,
        description: 'Certification not found.'
      })
    );
  }

  static create() {
    return applyDecorators(

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

      ApiResponse({
        status: 201,
        description: 'Certification created successfully.'
      }),

      ApiResponse({
        status: 401,
        description: 'Unauthorized.'
      }),

      ApiResponse({
        status: 409,
        description: 'Certification already exists.'
      }),
    );
  }

  static update() {
    return applyDecorators(

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

      ApiResponse({
        status: 200,
        description: 'Certification updated successfully.'
      }),

      ApiResponse({
        status: 401,
        description: 'Unauthorized.'
      }),

      ApiResponse({
        status: 404,
        description: 'Certification not found.'
      })
    );
  }

}