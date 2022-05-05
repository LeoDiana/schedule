import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonType } from '../lesson-types.entity';

@Injectable()
export class LessonTypesService {
  constructor(
    @InjectRepository(LessonType)
    private lessonTypeRepository: Repository<LessonType>,
  ) {}

  async findAll(): Promise<LessonType[]> {
    return await this.lessonTypeRepository.find();
  }

  async findOne(id: string): Promise<LessonType> {
    return await this.lessonTypeRepository.findOne(id);
  }

  async create(lessonType: LessonType): Promise<LessonType> {
    return await this.lessonTypeRepository.save(lessonType);
  }

  async update(lessonType: LessonType): Promise<LessonType> {
    return await this.lessonTypeRepository.save(lessonType);
  }

  async remove(id: string): Promise<void> {
    await this.lessonTypeRepository.delete(id);
  }
}
