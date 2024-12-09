import { Test, TestingModule } from '@nestjs/testing';
import { MedicoSerivce } from './medico.service';

describe('MedicoSerivce', () => {
  let service: MedicoSerivce;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicoSerivce],
    }).compile();

    service = module.get<MedicoSerivce>(MedicoSerivce);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
