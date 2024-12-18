import { Test, TestingModule } from '@nestjs/testing';
import { TriagemController } from './triagem.controller';
import { TriagemService } from './triagem.service';

describe('TriagemController', () => {
  let controller: TriagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriagemController],
      providers: [TriagemService],
    }).compile();

    controller = module.get<TriagemController>(TriagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
