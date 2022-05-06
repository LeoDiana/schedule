import { Test, TestingModule } from '@nestjs/testing';
import { LessonTypesService } from './lesson-types.service';

describe('LessonTypesService', () => {
  let service: LessonTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonTypesService],
    }).compile();

    service = module.get<LessonTypesService>(LessonTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
