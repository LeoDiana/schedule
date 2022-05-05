import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../groups.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findOne(id: string): Promise<Group> {
    return await this.groupRepository.findOne(id);
  }

  async create(group: Group): Promise<Group> {
    return await this.groupRepository.save(group);
  }

  async update(group: Group): Promise<Group> {
    return await this.groupRepository.save(group);
  }

  async remove(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
