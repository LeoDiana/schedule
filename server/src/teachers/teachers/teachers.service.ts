import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../teachers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: string): Promise<Teacher> {
    return await this.teacherRepository.findOne(id);
  }

  async create(teacher: Teacher): Promise<Teacher> {
    return await this.teacherRepository.save(teacher);
  }

  async update(teacher: Teacher): Promise<Teacher> {
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
