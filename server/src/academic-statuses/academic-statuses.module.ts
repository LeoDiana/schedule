import { Module } from '@nestjs/common';
import { AcademicStatusesService } from './academic-statuses/academic-statuses.service';
import { AcademicStatusesController } from './academic-statuses/academic-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicStatus } from './academic-statuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicStatus])],
  providers: [AcademicStatusesService],
  controllers: [AcademicStatusesController],
})
export class AcademicStatusesModule {}
