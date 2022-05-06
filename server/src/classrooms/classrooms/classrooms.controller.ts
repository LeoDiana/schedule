import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from '../classrooms.entity';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomsService) {}

  @Get()
  async findAll(): Promise<Classroom[]> {
    return await this.classroomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classroom> {
    return await this.classroomsService.findOne(id);
  }

  @Post()
  async create(@Body() classroom: Classroom): Promise<Classroom> {
    return await this.classroomsService.create(classroom);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() classroom: Classroom,
  ): Promise<Classroom> {
    return await this.classroomsService.update(classroom);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.classroomsService.remove(id);
  }
}
