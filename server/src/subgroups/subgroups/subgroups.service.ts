import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subgroup } from '../subgroups.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubgroupsService {
  constructor(
    @InjectRepository(Subgroup)
    private subgroupRepository: Repository<Subgroup>,
  ) {}

  async findAll(): Promise<Subgroup[]> {
    return await this.subgroupRepository.find();
  }

  async findOne(id: string): Promise<Subgroup> {
    return await this.subgroupRepository.findOne(id);
  }

  async create(subgroup: Subgroup): Promise<Subgroup> {
    return await this.subgroupRepository.save(subgroup);
  }

  async update(subgroup: Subgroup): Promise<Subgroup> {
    return await this.subgroupRepository.save(subgroup);
  }

  async remove(id: string): Promise<void> {
    await this.subgroupRepository.delete(id);
  }
}
