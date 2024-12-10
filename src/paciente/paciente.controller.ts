import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)  
  @Post()
  create(
    @Body('nome') nome: string,
    @Body('cpf') cpf: string,
    @Body('nomeResponsavel') nomeResponsavel: string,
    @Body('dataNascimento') dataNascimento: Date,
    @Body('notas') notas: string,
  ) {
    return this.pacienteService.create(nome, cpf, nomeResponsavel, dataNascimento, notas);
  }

  @UseGuards(JwtAuthGuard)  
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.pacienteService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacienteService.remove(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Put()
  update(
    @Body('id') id: string,
    @Body('nome') nome: string,
    @Body('cpf') cpf: string,
    @Body('nomeResponsavel') nomeResponsavel: string,
    @Body('dataNascimento') dataNascimento: Date,
    @Body('notas') notas: string,
  ) {
    return this.pacienteService.update(id, nome, cpf, nomeResponsavel, dataNascimento, notas);
  }

}