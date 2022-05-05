import { Module } from '@nestjs/common';
import { LessonTimesService } from './lesson-times/lesson-times.service';
import { LessonTimesController } from './lesson-times/lesson-times.controller';

@Module({
  providers: [LessonTimesService],
  controllers: [LessonTimesController]
})
export class LessonTimesModule {}
