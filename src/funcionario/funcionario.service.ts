import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {
  private readonly logger = new Logger(FuncionarioService.name);

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
    this.logger.log(`Creating a new funcionario with email: ${email}`);
    const hashedPassword = await bcrypt.hash(senha, 10);
    const novoFuncionario = this.funcionarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      crm,
      cargoId,
    });
    const savedFuncionario =
      await this.funcionarioRepository.save(novoFuncionario);

    this.logger.log(`Funcionario with email ${email} created successfully`);
    return savedFuncionario;
  }

  async findAll(): Promise<Funcionario[]> {
    this.logger.log('Fetching all funcionarios');
    return this.funcionarioRepository.find();
  }

  async findOneById(id: string): Promise<Funcionario> {
    this.logger.log(`Fetching funcionario by ID: ${id}`);
    const funcionario = await this.funcionarioRepository.findOne({
      where: { id },
    });

    if (!funcionario) {
      this.logger.warn(`Funcionario with ID ${id} not found`);
      throw new NotFoundException(`Funcionario with ID ${id} not found`);
    }

    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    this.logger.log(`Fetching funcionario by email: ${email}`);
    return this.funcionarioRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    nome: string,
    email: string,
    crm: string,
    cargoId: number,
  ): Promise<Funcionario> {
    this.logger.log(`Updating funcionario with ID: ${id}`);
    const funcionario = await this.findOneById(id);

    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.crm = crm;
    funcionario.cargoId = cargoId;

    const updatedFuncionario =
      await this.funcionarioRepository.save(funcionario);

    this.logger.log(`Funcionario with ID ${id} updated successfully`);
    return updatedFuncionario;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Marking funcionario with ID ${id} as deleted`);
    const funcionario = await this.findOneById(id);

    funcionario.deletado = true;

    await this.funcionarioRepository.save(funcionario);
    this.logger.log(`Funcionario with ID ${id} marked as deleted`);
  }
}
