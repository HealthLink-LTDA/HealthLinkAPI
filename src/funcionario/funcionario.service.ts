import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async create(
    nome: string,
    email: string,
    senha: string,
    crm: string,
    cargoId: number,
  ): Promise<Funcionario> {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const novoFuncionario = this.funcionarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      crm,
      cargoId,
    });

    return this.funcionarioRepository.save(novoFuncionario);
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  async findOneById(id: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: { id },
    });

    if (!funcionario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    nome: string,
    email: string,
    crm: string,
    cargoId: number,
  ): Promise<Funcionario> {
    const funcionario = await this.findOneById(id);

    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.crm = crm;
    funcionario.cargoId = cargoId;

    return this.funcionarioRepository.save(funcionario);
  }

  async remove(id: string): Promise<void> {
    const funcionario = await this.findOneById(id);

    funcionario.deletado = true;

    await this.funcionarioRepository.save(funcionario);
  }
}
