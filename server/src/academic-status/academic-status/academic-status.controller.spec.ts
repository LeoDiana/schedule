import { Test, TestingModule } from '@nestjs/testing';
import { AcademicStatusController } from './academic-status.controller';

describe('AcademicStatusController', () => {
  let controller: AcademicStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicStatusController],
    }).compile();

    controller = module.get<AcademicStatusController>(AcademicStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
