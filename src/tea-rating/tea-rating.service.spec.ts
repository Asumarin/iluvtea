import { Test, TestingModule } from '@nestjs/testing';
import { TeaRatingService } from './tea-rating.service';

describe('TeaRatingService', () => {
  let service: TeaRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeaRatingService],
    }).compile();

    service = module.get<TeaRatingService>(TeaRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
