import { Module } from '@nestjs/common';
import { LessonsService } from './lessons/lessons.service';
import { LessonsController } from './lessons/lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../teachers/teachers.entity';
import { LessonType } from '../lesson-types/lesson-types.entity';
import { Classroom } from '../classrooms/classrooms.entity';
import { LessonTime } from '../lesson-times/lesson-times.entity';
import { Subject } from '../subjects/subjects.entity';
import { Day } from '../days/days.entity';
import { WeekType } from '../week-types/week-types.entity';
import { Subgroup } from '../subgroups/subgroups.entity';
import { Lesson } from './lessons.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lesson,
      Teacher,
      LessonType,
      Classroom,
      LessonTime,
      Subject,
      Day,
      WeekType,
      Subgroup,
    ]),
  ],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
