import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTriagemDto } from './dto/create-triagem.dto';
import { UpdateTriagemDto } from './dto/update-triagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Triagem } from './entities/triagem.entity';
import { IntegerType, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Paciente } from 'src/paciente/paciente.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TriagemService {
  private readonly logger = new Logger(TriagemService.name);

  constructor(
    @InjectRepository(Triagem)
    private readonly triagemRepository: Repository<Triagem>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ) {}

  async create(
    triagemDto : CreateTriagemDto
  ): Promise<Triagem> {
    this.logger.log(`Creating a new triagem with paciente: ${triagemDto.paciente}`);

    const pacienteObj = await this.pacienteRepository.findOne({
      where: { id: triagemDto.paciente },
    });
    if (!pacienteObj) {
      this.logger.warn(`Paciente with ID ${triagemDto.paciente} not found`);
      throw new NotFoundException(`Paciente with ID ${triagemDto.paciente} not found`);
    }

    const enfermeiraObj = await this.funcionarioRepository.findOne({
      where: { id: triagemDto.enfermeira },
    });
    if (!enfermeiraObj) {
      this.logger.warn(`Enfermeira with ID ${triagemDto.enfermeira} not found`);
      throw new NotFoundException(`Enfermeira with ID ${triagemDto.enfermeira} not found`);
    }

    const novaTriagem = this.triagemRepository.create({
      neurologico: triagemDto.neurologico,
      cardioVascular: triagemDto.cardioVascular,
      respiratorio: triagemDto.respiratorio,
      nebulizacaoResgate: triagemDto.nebulizacaoResgate,
      vomitoPersistente: triagemDto.nebulizacaoResgate,
      enfermeira: enfermeiraObj,
      paciente: pacienteObj
    });

    const savedTriagem =
      await this.triagemRepository.save(novaTriagem);

    this.logger.log(`Triagem with paciente ${triagemDto.paciente}} created successfully`);
    return savedTriagem;
  }

  findAll() {
    this.logger.log('Fetching all triagens');
    return this.triagemRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} triagem`;
  }

  update(id: number, updateTriagemDto: UpdateTriagemDto) {
    return `This action updates a #${id} triagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} triagem`;
  }
}
