import { Module } from '@nestjs/common';
import { GroupLessonsController } from './group-lessons/group-lessons.controller';
import { GroupLessonsService } from './group-lessons/group-lessons.service';

@Module({
  controllers: [GroupLessonsController],
  providers: [GroupLessonsService]
})
export class GroupLessonsModule {}
