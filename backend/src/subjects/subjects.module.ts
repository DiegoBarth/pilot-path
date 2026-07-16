import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [
    DatabaseModule
  ],

  controllers: [
    SubjectsController
  ],

  providers: [
    SubjectsService
  ],

  exports: [
    SubjectsService
  ],
})

export class SubjectsModule {}