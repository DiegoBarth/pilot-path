import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/healt-response.dto';

@Injectable()
export class HealthService {
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      service: 'pilot-path-api',
      version: process.env.npm_package_version ?? '0.1.0',
      timestamp: new Date().toISOString(),
    };
  }
}