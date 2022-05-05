import { Test, TestingModule } from '@nestjs/testing';
import { LessonTimesController } from './lesson-times.controller';

describe('LessonTimesController', () => {
  let controller: LessonTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonTimesController],
    }).compile();

    controller = module.get<LessonTimesController>(LessonTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
