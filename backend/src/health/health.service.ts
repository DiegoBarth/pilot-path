import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { HealthResponseDto } from './dto/health-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }

  async getHealth(): Promise < HealthResponseDto > {
  await this.prisma.user.count();

  return {
    status: 'ok',
    service: this.configService.getOrThrow<string>('app.name'),
    version: this.configService.getOrThrow<string>('app.version'),
    timestamp: new Date().toISOString(),
  };
}
}