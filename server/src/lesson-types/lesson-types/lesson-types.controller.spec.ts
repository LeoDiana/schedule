import { Test, TestingModule } from '@nestjs/testing';
import { LessonTypesController } from './lesson-types.controller';

describe('LessonTypesController', () => {
  let controller: LessonTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonTypesController],
    }).compile();

    controller = module.get<LessonTypesController>(LessonTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
