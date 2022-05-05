import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Subject } from '../subjects.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subject> {
    return await this.subjectService.findOne(id);
  }

  @Post()
  async create(@Body() subject: Subject): Promise<Subject> {
    return await this.subjectService.create(subject);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subject: Subject,
  ): Promise<Subject> {
    return await this.subjectService.update(subject);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.subjectService.remove(id);
  }
}
