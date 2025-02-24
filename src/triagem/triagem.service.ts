import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TriagemDto } from './dto/triagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Triagem } from './entities/triagem.entity';
import { Repository } from 'typeorm';
import { Paciente } from 'src/paciente/paciente.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Prioridade } from 'src/prioridade/entities/prioridade.entity';
import { Recomendacao } from 'src/recomendacao/entities/recomendacao.entity';

@Injectable()
export class TriagemService {
  private readonly logger = new Logger(TriagemService.name);

  constructor(
    @InjectRepository(Triagem)
    private readonly triagemRepository: Repository<Triagem>,

    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,

    @InjectRepository(Prioridade)
    private readonly prioridadeRepository: Repository<Prioridade>,

    @InjectRepository(Recomendacao)
    private readonly recomendacaoRepository: Repository<Recomendacao>,
  ) {}

  async create(triagemDto: TriagemDto): Promise<Triagem> {
    this.logger.log(`Creating a new triagem for paciente: ${triagemDto.paciente}`);

    const paciente = await this.pacienteRepository.findOne({ where: { id: triagemDto.paciente } });
    if (!paciente) {
      this.logger.warn(`Paciente with ID ${triagemDto.paciente} not found`);

      throw new NotFoundException(`Paciente with ID ${triagemDto.paciente} not found`);
    }
    if(!paciente?.ativo){
      this.logger.warn(`Paciente with ID ${triagemDto.paciente} is disabled`);
      throw new NotFoundException(`Paciente with ID ${triagemDto.paciente} is disabled`);
    }

    const enfermeira = await this.funcionarioRepository.findOne({ where: { id: triagemDto.enfermeira } });
    if (!enfermeira) {
      throw new NotFoundException(`Enfermeira with ID ${triagemDto.enfermeira} not found`);
    }

    const novaTriagem = this.triagemRepository.create({
      ...triagemDto,
      paciente,
      enfermeira,
    });

    const savedTriagem = await this.triagemRepository.save(novaTriagem);

    await this.calcularPontuacaoESalvarNaPrioridade(savedTriagem);

    return savedTriagem;
  }

  private async calcularPontuacaoESalvarNaPrioridade(triagem: Triagem) {
    const pontuacao = triagem.neurologico + triagem.cardioVascular + triagem.respiratorio +
                      (triagem.nebulizacaoResgate ? 2 : 0) + (triagem.vomitoPersistente ? 2 : 0);

    this.logger.log(`Calculating PEWS score for triagem ${triagem.id}: ${pontuacao}`);

    const recomendacao = await this.recomendacaoRepository
      .createQueryBuilder('recomendacao')
      .where(':pontuacao BETWEEN recomendacao.pontuacao_min AND recomendacao.pontuacao_max', { pontuacao })
      .getOne();

    const prioridade = this.prioridadeRepository.create({
      triagem,
      paciente: triagem.paciente,
      pontuacao,
      recomendacao,
    });

    await this.prioridadeRepository.save(prioridade);
    this.logger.log(`Added triagem ${triagem.id} to prioridade with recommendation ${recomendacao?.id}`);
  }
  
  findAll() {
    this.logger.log('Fetching all triagens');
    return this.triagemRepository.find({
      relations: ['enfermeira', 'paciente']
    });
  }

  async findOne(id: string) {
    this.logger.log(`Fetching triagem by ID: ${id}`);
    const triagem = await this.triagemRepository.findOne({
      where: { id },
      relations: ['enfermeira', 'paciente']
    });

    if (!triagem) {
      throw new NotFoundException(`Triagem with ID ${id} not found`);
    }

    return triagem;
  }

  async findByPaciente(pacienteId: string) {
    this.logger.log(`Fetching all triagens for paciente ID: ${pacienteId}`);

    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });

    if (!paciente) {
      this.logger.warn(`Paciente with ID ${pacienteId} not found`);
      throw new NotFoundException(`Paciente with ID ${pacienteId} not found`);
    }
    if(!paciente?.ativo){
      this.logger.warn(`Paciente with ID ${pacienteId} is disabled`);
      throw new NotFoundException(`Paciente with ID ${pacienteId} is disabled`);
    }

    return this.triagemRepository.find({
      where: { paciente },
      relations: ['enfermeira'],
    });
  }

  async update(id: string, triagemDto: TriagemDto) {
    this.logger.log(`Updating triagem with ID: ${id}`);

    const triagem = await this.triagemRepository.findOne({ where: { id } });
    if (!triagem) {
      throw new NotFoundException(`Triagem with ID ${id} not found`);
    }

    const paciente = await this.pacienteRepository.findOne({ where: { id: triagemDto.paciente } });
    if (!paciente) {
      throw new NotFoundException(`Paciente with ID ${triagemDto.paciente} not found`);
    } if(!paciente?.ativo){
      this.logger.warn(`Paciente with ID ${triagemDto.paciente} is disabled`);
      throw new NotFoundException(`Paciente with ID ${triagemDto.paciente} is disabled`);
    }

    const enfermeira = await this.funcionarioRepository.findOne({ where: { id: triagemDto.enfermeira } });
    if (!enfermeira) {
      throw new NotFoundException(`Enfermeira with ID ${triagemDto.enfermeira} not found`);
    }

    Object.assign(triagem, triagemDto);
    const savedTriagem = await this.triagemRepository.save(triagem);

    await this.calcularPontuacaoESalvarNaPrioridade(savedTriagem);

    return savedTriagem;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Marking triagem with ID ${id} as deleted`);
    const triagem = await this.findOne(id);

    triagem.deletado = true;

    await this.triagemRepository.save(triagem);
    this.logger.log(`Triagem with ID ${id} marked as deleted`);
  }

  async findAllPrioridadeByPaciente(pacienteId: string){
    this.logger.log(`Fetching all prioridades for paciente ID: ${pacienteId}`);

    const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });

    if (!paciente) {
        this.logger.warn(`Paciente with ID ${pacienteId} not found`);
        throw new NotFoundException(`Paciente with ID ${pacienteId} not found`);
    }
    if(!paciente?.ativo){
        this.logger.warn(`Paciente with ID ${pacienteId} is disabled`);
        throw new NotFoundException(`Paciente with ID ${pacienteId} is disabled`);
    }

    return this.prioridadeRepository.find({
        where: { paciente }
    });
  }
}
