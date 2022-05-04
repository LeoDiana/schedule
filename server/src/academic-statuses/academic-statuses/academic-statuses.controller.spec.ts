import { Test, TestingModule } from '@nestjs/testing';
import { AcademicStatusesController } from './academic-statuses.controller';

describe('AcademicStatusController', () => {
  let controller: AcademicStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicStatusesController],
    }).compile();

    controller = module.get<AcademicStatusesController>(
      AcademicStatusesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
