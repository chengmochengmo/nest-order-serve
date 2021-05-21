import { Test, TestingModule } from '@nestjs/testing';
import { CatesController } from './cates.controller';

describe('CatesController', () => {
  let controller: CatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatesController],
    }).compile();

    controller = module.get<CatesController>(CatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
