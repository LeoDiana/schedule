import { Test, TestingModule } from '@nestjs/testing';
import { GroupLessonsService } from './group-lessons.service';

describe('GroupLessonsService', () => {
  let service: GroupLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupLessonsService],
    }).compile();

    service = module.get<GroupLessonsService>(GroupLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
