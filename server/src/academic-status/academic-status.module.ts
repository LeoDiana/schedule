import { Module } from '@nestjs/common';
import { AcademicStatusService } from './academic-status/academic-status.service';
import { AcademicStatusController } from './academic-status/academic-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicStatus } from './academic-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicStatus])],
  providers: [AcademicStatusService],
  controllers: [AcademicStatusController],
})
export class AcademicStatusModule {}
