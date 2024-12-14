import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from './funcionario.entity';
import { Cargo } from 'src/cargo/cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario, Cargo])],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
