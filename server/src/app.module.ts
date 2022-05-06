import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './lessons/lessons.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicStatusesModule } from './academic-statuses/academic-statuses.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { DaysModule } from './days/days.module';
import { GroupsModule } from './groups/groups.module';
import { SubgroupsModule } from './subgroups/subgroups.module';
import { GrouplessonsModule } from './grouplessons/grouplessons.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonTypesModule } from './lesson-types/lesson-types.module';
import { LessonTimesModule } from './lesson-times/lesson-times.module';
import { ClassFacilitiesModule } from './class-facilities/class-facilities.module';
import { LessonFacilitiesModule } from './lesson-facilities/lesson-facilities.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { WeekTypesModule } from './week-types/week-types.module';

@Module({
  imports: [
    LessonsModule,
    TeachersModule,
    AcademicStatusesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Indicates if database schema should be auto created on every application launch.
    }),
    BuildingsModule,
    ClassroomsModule,
    DaysModule,
    GroupsModule,
    SubgroupsModule,
    GrouplessonsModule,
    SubjectsModule,
    LessonTypesModule,
    LessonTimesModule,
    ClassFacilitiesModule,
    LessonFacilitiesModule,
    FacilitiesModule,
    WeekTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
