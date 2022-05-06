import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../buildings.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  async findAll(): Promise<Building[]> {
    return await this.buildingRepository.find();
  }

  async findOne(id: string): Promise<Building> {
    return await this.buildingRepository.findOne(id);
  }

  async create(building: Building): Promise<Building> {
    return await this.buildingRepository.save(building);
  }

  async update(building: Building): Promise<Building> {
    return await this.buildingRepository.save(building);
  }

  async remove(id: string): Promise<void> {
    await this.buildingRepository.delete(id);
  }
}
