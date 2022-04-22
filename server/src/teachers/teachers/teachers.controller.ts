import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../teachers.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    return await this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return await this.teachersService.findOne(id);
  }

  @Post()
  async create(@Body() teacher: Teacher): Promise<Teacher> {
    return await this.teachersService.create(teacher);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() teacher: Teacher,
  ): Promise<Teacher> {
    return await this.teachersService.update(teacher);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.teachersService.remove(id);
  }
}
