import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Funcionario } from './funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async create(nome: string, email: string, senha: string, cpf: string): Promise<Funcionario> {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const novoFuncionario = this.funcionarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      cpf,
    });
    return this.funcionarioRepository.save(novoFuncionario);
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  async findOneById(id: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }
    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { email } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com email ${email} não encontrado.`);
    }
    return funcionario;
  }

  async update(id: string, nome: string, email: string, cpf: string): Promise<Funcionario> {
    const funcionario = await this.findOneById(id);
    
    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.cpf = cpf;

    return this.funcionarioRepository.save(funcionario);
  }

  async remove(id: string): Promise<void> {
    const funcionario = await this.findOneById(id);
    await this.funcionarioRepository.remove(funcionario);
  }
}
