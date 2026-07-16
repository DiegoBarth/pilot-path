import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';

@Module({
  imports: [
    DatabaseModule
  ],

  controllers: [
    CertificationsController
  ],

  providers: [
    CertificationsService
  ],

  exports: [
    CertificationsService
  ],
})

export class CertificationsModule {}