import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings/buildings.service';
import { BuildingsController } from './buildings/buildings.controller';

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController]
})
export class BuildingsModule {}
