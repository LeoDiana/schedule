import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from '../days.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day)
    private dayRepository: Repository<Day>,
  ) {}

  async findAll(): Promise<Day[]> {
    return await this.dayRepository.find();
  }

  async findOne(id: string): Promise<Day> {
    return await this.dayRepository.findOne(id);
  }

  async create(day: Day): Promise<Day> {
    return await this.dayRepository.save(day);
  }

  async update(day: Day): Promise<Day> {
    return await this.dayRepository.save(day);
  }

  async remove(id: string): Promise<void> {
    await this.dayRepository.delete(id);
  }
}
