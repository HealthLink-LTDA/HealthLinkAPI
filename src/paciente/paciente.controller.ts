import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
  private readonly logger = new Logger(PacienteController.name);

  constructor(private readonly pacienteService: PacienteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    this.logger.log('Fetching all pacientes');
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
    this.logger.log(`Creating a new paciente with CPF: ${cpf}`);
    return this.pacienteService.create(
      nome,
      cpf,
      nomeResponsavel,
      dataNascimento,
      notas,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    this.logger.log(`Fetching paciente by ID: ${id}`);
    return this.pacienteService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting paciente with ID: ${id}`);
    return this.pacienteService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('nome') nome: string,
    @Body('cpf') cpf: string,
    @Body('nomeResponsavel') nomeResponsavel: string,
    @Body('dataNascimento') dataNascimento: Date,
    @Body('notas') notas: string,
  ) {
    this.logger.log(`Updating paciente with ID: ${id}`);
    return this.pacienteService.update(
      id,
      nome,
      cpf,
      nomeResponsavel,
      dataNascimento,
      notas,
    );
  }
}
