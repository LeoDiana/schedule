import { Test, TestingModule } from '@nestjs/testing';
import { SubgroupsService } from './subgroups.service';

describe('SubgroupsService', () => {
  let service: SubgroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubgroupsService],
    }).compile();

    service = module.get<SubgroupsService>(SubgroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
