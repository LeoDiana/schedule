import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../lessons.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async findOne(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne(id);
  }

  async create(lesson: Lesson): Promise<Lesson> {
    return await this.lessonRepository.save(lesson);
  }

  async update(lesson: Lesson): Promise<Lesson> {
    return await this.lessonRepository.save(lesson);
  }

  async remove(id: string): Promise<void> {
    await this.lessonRepository.delete(id);
  }
}
