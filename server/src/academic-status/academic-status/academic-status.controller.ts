import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AcademicStatusService } from './academic-status.service';
import { AcademicStatus } from '../academic-status.entity';

@Controller('academic-status')
export class AcademicStatusController {
  constructor(private academicStatusService: AcademicStatusService) {}

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
