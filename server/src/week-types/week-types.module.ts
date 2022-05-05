import { Module } from '@nestjs/common';
import { WeekTypesController } from './week-types/week-types.controller';
import { WeekTypesService } from './week-types/week-types.service';

@Module({
  controllers: [WeekTypesController],
  providers: [WeekTypesService]
})
export class WeekTypesModule {}
