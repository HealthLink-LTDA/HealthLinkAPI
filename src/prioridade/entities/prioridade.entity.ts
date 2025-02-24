import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Triagem } from 'src/triagem/entities/triagem.entity';
import { Paciente } from 'src/paciente/paciente.entity';
import { Recomendacao } from 'src/recomendacao/entities/recomendacao.entity';

@Entity('prioridade')
export class Prioridade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Triagem, { nullable: false, eager: true })
  @JoinColumn({ name: 'triagem_id' })
  triagem: Triagem;

  @ManyToOne(() => Paciente, { nullable: false, eager: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @Column({ type: 'int', nullable: false })
  pontuacao: number;

  @ManyToOne(() => Recomendacao, { nullable: true, eager: true })
  @JoinColumn({ name: 'recomendacao_id' })
  recomendacao: Recomendacao;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
