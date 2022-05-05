import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeekType } from '../week-types.entity';

@Injectable()
export class WeekTypesService {
  constructor(
    @InjectRepository(WeekType)
    private weekTypeRepository: Repository<WeekType>,
  ) {}

  async findAll(): Promise<WeekType[]> {
    return await this.weekTypeRepository.find();
  }

  async findOne(id: string): Promise<WeekType> {
    return await this.weekTypeRepository.findOne(id);
  }

  async create(weekType: WeekType): Promise<WeekType> {
    return await this.weekTypeRepository.save(weekType);
  }

  async update(weekType: WeekType): Promise<WeekType> {
    return await this.weekTypeRepository.save(weekType);
  }

  async remove(id: string): Promise<void> {
    await this.weekTypeRepository.delete(id);
  }
}
