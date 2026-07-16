import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto';

export const HealthSwagger = {
  check: applyDecorators(
    ApiTags('Health'),

    ApiOperation({
      summary: 'Check API health',
      description: 'Returns the current status of the API.',
    }),

    ApiOkResponse({
      description: 'API is running successfully.',
      type: HealthResponseDto,
    })

  )

};