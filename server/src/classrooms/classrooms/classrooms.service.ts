import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from '../classrooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  async findAll(): Promise<Classroom[]> {
    return await this.classroomRepository.find();
  }

  async findOne(id: string): Promise<Classroom> {
    return await this.classroomRepository.findOne(id);
  }

  async create(classroom: Classroom): Promise<Classroom> {
    return await this.classroomRepository.save(classroom);
  }

  async update(classroom: Classroom): Promise<Classroom> {
    return await this.classroomRepository.save(classroom);
  }

  async remove(id: string): Promise<void> {
    await this.classroomRepository.delete(id);
  }
}
