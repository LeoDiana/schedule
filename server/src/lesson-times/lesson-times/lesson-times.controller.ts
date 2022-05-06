import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonTime } from '../lesson-times.entity';
import { LessonTimesService } from './lesson-times.service';

@Controller('lesson-times')
export class LessonTimesController {
  constructor(private lessonTimeService: LessonTimesService) {}

  @Get()
  async findAll(): Promise<LessonTime[]> {
    return await this.lessonTimeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LessonTime> {
    return await this.lessonTimeService.findOne(id);
  }

  @Post()
  async create(@Body() lessonTime: LessonTime): Promise<LessonTime> {
    return await this.lessonTimeService.create(lessonTime);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() lessonTime: LessonTime,
  ): Promise<LessonTime> {
    return await this.lessonTimeService.update(lessonTime);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.lessonTimeService.remove(id);
  }
}
