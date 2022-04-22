import { Module } from '@nestjs/common';
import { TeachersService } from './teachers/teachers.service';
import { TeachersController } from './teachers/teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teachers.entity';
import { AcademicStatus } from '../academic-status/academic-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, AcademicStatus])],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}
