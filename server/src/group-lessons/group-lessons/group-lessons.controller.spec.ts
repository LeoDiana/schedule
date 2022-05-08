import { Test, TestingModule } from '@nestjs/testing';
import { GroupLessonsController } from './group-lessons.controller';

describe('GroupLessonsController', () => {
  let controller: GroupLessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupLessonsController],
    }).compile();

    controller = module.get<GroupLessonsController>(GroupLessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
