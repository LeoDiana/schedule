import { Module } from '@nestjs/common';
import { LessonTypesController } from './lesson-types/lesson-types.controller';
import { LessonTypesService } from './lesson-types/lesson-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonType } from './lesson-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonType])],
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
})
export class LessonTypesModule {}
