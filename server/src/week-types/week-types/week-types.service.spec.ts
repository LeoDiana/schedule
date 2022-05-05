import { Test, TestingModule } from '@nestjs/testing';
import { WeekTypesService } from './week-types.service';

describe('WeekTypesService', () => {
  let service: WeekTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeekTypesService],
    }).compile();

    service = module.get<WeekTypesService>(WeekTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
