import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(nome: string, cpf: string, nomeResponsavel: string, dataNascimento: Date, notas:string): Promise<Paciente> {
    const novoPaciente = this.pacienteRepository.create({
      nome,
      cpf,
      nomeResponsavel,
      dataNascimento,
      notas
    });
    return this.pacienteRepository.save(novoPaciente);
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findOneById(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }
    return paciente;
  }


  async update(id: string, nome:string, cpf: string, nomeResponsavel: string, dataNascimento: Date, notas: string): Promise<Paciente> {
    const paciente = await this.findOneById(id);
    paciente.nome = nome;
    paciente.cpf = cpf;
    paciente.nomeResponsavel = nomeResponsavel;
    paciente.dataNascimento = dataNascimento;
    paciente.notas = notas;
    return this.pacienteRepository.save(paciente);
  }

  async remove(id: string): Promise<void> {
    const paciente = await this.findOneById(id);
    await this.pacienteRepository.remove(paciente);
  }
}
