import { Module } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { TriagemController } from './triagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Triagem } from './entities/triagem.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Paciente } from 'src/paciente/paciente.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Recomendacao } from 'src/recomendacao/entities/recomendacao.entity';
import { Prioridade } from 'src/prioridade/entities/prioridade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Triagem, Funcionario, Paciente, Recomendacao, Prioridade])],
  controllers: [TriagemController],
  providers: [TriagemService, JwtStrategy],
  exports: [TriagemService],
})
export class TriagemModule {}
