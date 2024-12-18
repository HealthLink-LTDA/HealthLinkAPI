import { Test, TestingModule } from '@nestjs/testing';
import { TriagemService } from './triagem.service';

describe('TriagemService', () => {
  let service: TriagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriagemService],
    }).compile();

    service = module.get<TriagemService>(TriagemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
