import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subjects.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  async findOne(id: string): Promise<Subject> {
    return await this.subjectRepository.findOne(id);
  }

  async create(subject: Subject): Promise<Subject> {
    return await this.subjectRepository.save(subject);
  }

  async update(subject: Subject): Promise<Subject> {
    return await this.subjectRepository.save(subject);
  }

  async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
