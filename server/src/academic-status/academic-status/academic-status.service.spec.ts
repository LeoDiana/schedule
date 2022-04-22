import { Test, TestingModule } from '@nestjs/testing';
import { AcademicStatusService } from './academic-status.service';

describe('AcademicStatusService', () => {
  let service: AcademicStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicStatusService],
    }).compile();

    service = module.get<AcademicStatusService>(AcademicStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
