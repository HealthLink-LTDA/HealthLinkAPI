import { Module } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { TriagemController } from './triagem.controller';

@Module({
  controllers: [TriagemController],
  providers: [TriagemService],
})
export class TriagemModule {}
