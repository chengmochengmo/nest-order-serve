import { Test, TestingModule } from '@nestjs/testing';
import { CatesService } from './cates.service';

describe('CatesService', () => {
  let service: CatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatesService],
    }).compile();

    service = module.get<CatesService>(CatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
