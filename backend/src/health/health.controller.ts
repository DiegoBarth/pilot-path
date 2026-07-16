import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { HealthService } from './health.service';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Check API health',
    description: 'Returns the current status of the API.',
  })
  @ApiOkResponse({
    description: 'API is running successfully.',
    type: HealthResponseDto,
  })
  getHealth() {
    return this.healthService.getHealth();
  }
}