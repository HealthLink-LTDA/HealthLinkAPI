import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Medico } from './medico.entity';
import { MedicoController } from './medico.controller';
import { MedicoSerivce } from './medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  controllers: [MedicoController],
  providers: [MedicoSerivce],
  exports: [MedicoSerivce],
})
export class MedicoModule {}
