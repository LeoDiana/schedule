import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Lesson } from '../lessons.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  async findAll(): Promise<Lesson[]> {
    return await this.lessonsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lesson> {
    return await this.lessonsService.findOne(id);
  }

  @Post()
  async create(@Body() lesson: Lesson): Promise<Lesson> {
    return await this.lessonsService.create(lesson);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() lesson: Lesson,
  ): Promise<Lesson> {
    return await this.lessonsService.update(lesson);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.lessonsService.remove(id);
  }
}
