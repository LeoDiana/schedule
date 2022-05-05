import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { LessonType } from '../lesson-types.entity';

@Controller('lesson-types')
export class LessonTypesController {
  constructor(private lessonTypesService: LessonTypesService) {}

  @Get()
  async findAll(): Promise<LessonType[]> {
    return await this.lessonTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LessonType> {
    return await this.lessonTypesService.findOne(id);
  }

  @Post()
  async create(@Body() lessonType: LessonType): Promise<LessonType> {
    return await this.lessonTypesService.create(lessonType);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() lessonType: LessonType,
  ): Promise<LessonType> {
    return await this.lessonTypesService.update(lessonType);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.lessonTypesService.remove(id);
  }
}
