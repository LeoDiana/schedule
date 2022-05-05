import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonTime } from '../lesson-times.entity';

@Injectable()
export class LessonTimesService {
  constructor(
    @InjectRepository(LessonTime)
    private lessonTimeRepository: Repository<LessonTime>,
  ) {}

  async findAll(): Promise<LessonTime[]> {
    return await this.lessonTimeRepository.find();
  }

  async findOne(id: string): Promise<LessonTime> {
    return await this.lessonTimeRepository.findOne(id);
  }

  async create(lessonTime: LessonTime): Promise<LessonTime> {
    return await this.lessonTimeRepository.save(lessonTime);
  }

  async update(lessonTime: LessonTime): Promise<LessonTime> {
    return await this.lessonTimeRepository.save(lessonTime);
  }

  async remove(id: string): Promise<void> {
    await this.lessonTimeRepository.delete(id);
  }
}
