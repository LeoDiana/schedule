import { Module } from '@nestjs/common';
import { LessonTimesService } from './lesson-times/lesson-times.service';
import { LessonTimesController } from './lesson-times/lesson-times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonTime } from './lesson-times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonTime])],
  providers: [LessonTimesService],
  controllers: [LessonTimesController],
})
export class LessonTimesModule {}
