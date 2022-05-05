import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubgroupsService } from './subgroups.service';
import { Subgroup } from '../subgroups.entity';

@Controller('subgroups')
export class SubgroupsController {
  constructor(private subgroupsService: SubgroupsService) {}

  @Get()
  async findAll(): Promise<Subgroup[]> {
    return await this.subgroupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subgroup> {
    return await this.subgroupsService.findOne(id);
  }

  @Post()
  async create(@Body() subgroup: Subgroup): Promise<Subgroup> {
    return await this.subgroupsService.create(subgroup);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subgroup: Subgroup,
  ): Promise<Subgroup> {
    return await this.subgroupsService.update(subgroup);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.subgroupsService.remove(id);
  }
}
