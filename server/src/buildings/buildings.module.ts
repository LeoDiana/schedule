import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings/buildings.service';
import { BuildingsController } from './buildings/buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './buildings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingsService],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
