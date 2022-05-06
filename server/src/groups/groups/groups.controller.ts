import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from '../groups.entity';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  async findAll(): Promise<Group[]> {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return await this.groupService.findOne(id);
  }

  @Post()
  async create(@Body() group: Group): Promise<Group> {
    return await this.groupService.create(group);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() group: Group): Promise<Group> {
    return await this.groupService.update(group);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.groupService.remove(id);
  }
}
