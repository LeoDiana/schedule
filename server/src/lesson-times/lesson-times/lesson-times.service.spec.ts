import { Test, TestingModule } from '@nestjs/testing';
import { LessonTimesService } from './lesson-times.service';

describe('LessonTimesService', () => {
  let service: LessonTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonTimesService],
    }).compile();

    service = module.get<LessonTimesService>(LessonTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
