import { Module } from '@nestjs/common';
import { WeekTypesController } from './week-types/week-types.controller';
import { WeekTypesService } from './week-types/week-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekType } from './week-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeekType])],
  controllers: [WeekTypesController],
  providers: [WeekTypesService],
})
export class WeekTypesModule {}
