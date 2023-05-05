import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('/subgroup/:id')
  async findBySubgroup(@Param('id') id: string): Promise<Lesson[]> {
    return await this.lessonsService.findBySubgroup(id);
  }

  @Get('/teacher/:id')
  async findByTeacher(@Param('id') id: string): Promise<Lesson[]> {
    return await this.lessonsService.findByTeacher(id);
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
    const newLesson = {
      weekType: null,
      lessonTime: null,
      day: null,
      ...lesson,
    };
    return await this.lessonsService.update(newLesson);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.lessonsService.remove(id);
  }
}
