import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

@Module({
  imports: [
    DatabaseModule
  ],

  controllers: [
    EnrollmentsController
  ],

  providers: [
    EnrollmentsService
  ],

  exports: [
    EnrollmentsService
  ],
})

export class EnrollmentsModule { }