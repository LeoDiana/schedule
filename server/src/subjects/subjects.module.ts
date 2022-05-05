import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects/subjects.service';
import { SubjectsController } from './subjects/subjects.controller';

@Module({
  providers: [SubjectsService],
  controllers: [SubjectsController]
})
export class SubjectsModule {}
