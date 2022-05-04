import { Test, TestingModule } from '@nestjs/testing';
import { AcademicStatusesService } from './academic-status.service';

describe('AcademicStatusService', () => {
  let service: AcademicStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicStatusesService],
    }).compile();

    service = module.get<AcademicStatusesService>(AcademicStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
