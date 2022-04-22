import { Module } from '@nestjs/common';
import { LessonsService } from './lessons/lessons.service';
import { LessonsController } from './lessons/lessons.controller';

@Module({
  providers: [LessonsService],
  controllers: [LessonsController]
})
export class LessonsModule {}
