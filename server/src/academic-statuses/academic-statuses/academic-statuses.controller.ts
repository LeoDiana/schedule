import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AcademicStatusesService } from './academic-statuses.service';
import { AcademicStatus } from '../academic-statuses.entity';

@Controller('academic-statuses')
export class AcademicStatusesController {
  constructor(private academicStatusService: AcademicStatusesService) {}

  @Get()
  async findAll(): Promise<AcademicStatus[]> {
    return await this.academicStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AcademicStatus> {
    return await this.academicStatusService.findOne(id);
  }

  @Post()
  async create(@Body() teacher: AcademicStatus): Promise<AcademicStatus> {
    return await this.academicStatusService.create(teacher);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() teacher: AcademicStatus,
  ): Promise<AcademicStatus> {
    return await this.academicStatusService.update(teacher);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.academicStatusService.remove(id);
  }
}
