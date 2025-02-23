import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('recomendacao')
export class Recomendacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  pontuacao_min: number;

  @Column({ type: 'int', nullable: false })
  pontuacao_max: number;

  @Column({ type: 'int', nullable: false, comment: 'Tempo em minutos para a próxima análise' })
  tempo_reanalise: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
