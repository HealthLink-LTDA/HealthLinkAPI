import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';

@Injectable()
export class PacienteService {
  private readonly logger = new Logger(PacienteService.name);

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(
    nome: string,
    cpf: string,
    nomeResponsavel: string,
    dataNascimento: Date,
    notas: string,
  ): Promise<Paciente> {
    this.logger.log(`Creating a new paciente with CPF: ${cpf}`);
    const novoPaciente = this.pacienteRepository.create({
      nome,
      cpf,
      nomeResponsavel,
      dataNascimento,
      notas,
    });

    const savedPaciente = await this.pacienteRepository.save(novoPaciente);
    this.logger.log(`Paciente with CPF ${cpf} created successfully`);
    return savedPaciente;
  }

  async findAll(): Promise<Paciente[]> {
    this.logger.log('Fetching all pacientes');
    return this.pacienteRepository.find();
  }

  async findOneById(id: string): Promise<Paciente> {
    this.logger.log(`Fetching paciente by ID: ${id}`);
    const paciente = await this.pacienteRepository.findOne({ where: { id } });

    if (!paciente) {
      this.logger.warn(`Paciente with ID ${id} not found`);
      throw new NotFoundException(`Paciente with ID ${id} not found`);
    }

    return paciente;
  }

  async update(
    id: string,
    nome: string,
    cpf: string,
    nomeResponsavel: string,
    dataNascimento: Date,
    notas: string,
  ): Promise<Paciente> {
    this.logger.log(`Updating paciente with ID: ${id}`);
    const paciente = await this.findOneById(id);

    paciente.nome = nome;
    paciente.cpf = cpf;
    paciente.nomeResponsavel = nomeResponsavel;
    paciente.dataNascimento = dataNascimento;
    paciente.notas = notas;

    const updatedPaciente = await this.pacienteRepository.save(paciente);
    this.logger.log(`Paciente with ID ${id} updated successfully`);
    return updatedPaciente;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting paciente with ID: ${id}`);
    const paciente = await this.findOneById(id);

    await this.pacienteRepository.remove(paciente);
    this.logger.log(`Paciente with ID ${id} deleted successfully`);
  }
}
