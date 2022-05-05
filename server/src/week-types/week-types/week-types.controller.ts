import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WeekTypesService } from './week-types.service';
import { WeekType } from '../week-types.entity';

@Controller('week-types')
export class WeekTypesController {
  constructor(private weekTypesService: WeekTypesService) {}

  @Get()
  async findAll(): Promise<WeekType[]> {
    return await this.weekTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WeekType> {
    return await this.weekTypesService.findOne(id);
  }

  @Post()
  async create(@Body() weekType: WeekType): Promise<WeekType> {
    return await this.weekTypesService.create(weekType);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() weekType: WeekType,
  ): Promise<WeekType> {
    return await this.weekTypesService.update(weekType);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.weekTypesService.remove(id);
  }
}
