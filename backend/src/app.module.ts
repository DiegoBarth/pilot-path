import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CertificationsModule } from './certifications/certifications.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig
      ],
    }),

    DatabaseModule,
    HealthModule,
    AuthModule,
    CertificationsModule,
    EnrollmentsModule
  ],
})
export class AppModule { }