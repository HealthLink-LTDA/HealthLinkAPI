import { Cargo } from 'src/cargo/cargo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  criadoAt: Date;

  @UpdateDateColumn()
  modificadoAt: Date;

  @Column({ default: false })
  deletado: boolean;

  @Column({ unique: true })
  crm: string;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'cargoId' })
  cargo: Cargo;
}
