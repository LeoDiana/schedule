import { Test, TestingModule } from '@nestjs/testing';
import { WeekTypesController } from './week-types.controller';

describe('WeekTypesController', () => {
  let controller: WeekTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeekTypesController],
    }).compile();

    controller = module.get<WeekTypesController>(WeekTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
