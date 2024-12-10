import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)  
  @Post()
  create(
    @Body() nome: string,
            cpf: string,
            nomeResponsavel: string,
            dataNascimento: Date,
            notas: string
  ) {
    return this.pacienteService.create(nome, cpf, nomeResponsavel, dataNascimento, notas);
  }

  @UseGuards(JwtAuthGuard)  
  @Get()
  getById( @Param() id: string ) {
    return this.pacienteService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Delete()
  delete( @Param() id: string ) {
    return this.pacienteService.remove(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Put()
  update(
    @Body() id: string,
            nome: string,
            cpf: string,
            nomeResponsavel: string,
            dataNascimento: Date,
            notas: string
  ) {
    return this.pacienteService.update(id, nome, cpf, nomeResponsavel, dataNascimento, notas);
  }

}