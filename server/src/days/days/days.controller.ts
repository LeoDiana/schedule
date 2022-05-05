import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DaysService } from './days.service';
import { Day } from '../days.entity';

@Controller('days')
export class DaysController {
  constructor(private daysService: DaysService) {}

  @Get()
  async findAll(): Promise<Day[]> {
    return await this.daysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Day> {
    return await this.daysService.findOne(id);
  }

  @Post()
  async create(@Body() day: Day): Promise<Day> {
    return await this.daysService.create(day);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() day: Day): Promise<Day> {
    return await this.daysService.update(day);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.daysService.remove(id);
  }
}
