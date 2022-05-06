import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Building } from '../buildings.entity';
import { BuildingsService } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
  constructor(private buildingService: BuildingsService) {}

  @Get()
  async findAll(): Promise<Building[]> {
    return await this.buildingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Building> {
    return await this.buildingService.findOne(id);
  }

  @Post()
  async create(@Body() building: Building): Promise<Building> {
    return await this.buildingService.create(building);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() building: Building,
  ): Promise<Building> {
    return await this.buildingService.update(building);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.buildingService.remove(id);
  }
}
