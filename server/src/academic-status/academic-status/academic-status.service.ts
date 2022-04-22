import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicStatus } from '../academic-status.entity';

@Injectable()
export class AcademicStatusService {
  constructor(
    @InjectRepository(AcademicStatus)
    private academicStatusRepository: Repository<AcademicStatus>,
  ) {}

  async findAll(): Promise<AcademicStatus[]> {
    return await this.academicStatusRepository.find();
  }

  async findOne(id: string): Promise<AcademicStatus> {
    return await this.academicStatusRepository.findOne(id);
  }

  async create(academicStatus: AcademicStatus): Promise<AcademicStatus> {
    return await this.academicStatusRepository.save(academicStatus);
  }

  async update(academicStatus: AcademicStatus): Promise<AcademicStatus> {
    return await this.academicStatusRepository.save(academicStatus);
  }

  async remove(id: string): Promise<void> {
    await this.academicStatusRepository.delete(id);
  }
}
