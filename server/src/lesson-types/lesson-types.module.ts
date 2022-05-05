import { Module } from '@nestjs/common';
import { LessonTypesController } from './lesson-types/lesson-types.controller';
import { LessonTypesService } from './lesson-types/lesson-types.service';

@Module({
  controllers: [LessonTypesController],
  providers: [LessonTypesService]
})
export class LessonTypesModule {}
