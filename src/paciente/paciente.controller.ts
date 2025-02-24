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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('paciente')
@ApiTags('Paciente')
@ApiBearerAuth()
export class PacienteController {
  private readonly logger = new Logger(PacienteController.name);

  constructor(private readonly pacienteService: PacienteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all pacientes' })
  @ApiResponse({ status: 200, description: 'List of pacientes' })
  findAll() {
    this.logger.log('Fetching all pacientes');
    return this.pacienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new paciente' })
  @ApiResponse({ status: 201, description: 'Paciente created successfully' })
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
  @ApiOperation({ summary: 'Get a paciente by ID' })
  @ApiResponse({ status: 200, description: 'Paciente details' })
  getById(@Param('id') id: string) {
    this.logger.log(`Fetching paciente by ID: ${id}`);
    return this.pacienteService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a paciente by ID' })
  @ApiResponse({ status: 200, description: 'Paciente deleted successfully' })
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting paciente with ID: ${id}`);
    return this.pacienteService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a paciente by ID' })
  @ApiResponse({ status: 200, description: 'Paciente updated successfully' })
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

  @UseGuards(JwtAuthGuard)
  @Put('/activate/:id')
  @ApiOperation({ summary: 'Activate a Paciente by ID' })
  @ApiResponse({ status: 200, description: 'Paciente activated successfully' })
  activate(@Param('id') id: string) {
    this.logger.log(`Activating paciente with ID: ${id}`);
    return this.pacienteService.updateActive(id, true);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/disable/:id')
  @ApiOperation({ summary: 'Disable a Paciente by ID' })
  @ApiResponse({ status: 200, description: 'Paciente disabled successfully' })
  disable(@Param('id') id: string) {
    this.logger.log(`Disabling paciente with ID: ${id}`);
    return this.pacienteService.updateActive(id, false);
  }
}
