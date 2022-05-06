import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms/classrooms.controller';
import { ClassroomsService } from './classrooms/classrooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classrooms.entity';
import { Building } from '../buildings/buildings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom, Building])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
