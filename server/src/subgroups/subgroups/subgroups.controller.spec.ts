import { Test, TestingModule } from '@nestjs/testing';
import { SubgroupsController } from './subgroups.controller';

describe('SubgroupsController', () => {
  let controller: SubgroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgroupsController],
    }).compile();

    controller = module.get<SubgroupsController>(SubgroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
