import { Test, TestingModule } from '@nestjs/testing';
import { ManyteaController } from './manytea.controller';

describe('ManyteaController', () => {
  let controller: ManyteaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManyteaController],
    }).compile();

    controller = module.get<ManyteaController>(ManyteaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
