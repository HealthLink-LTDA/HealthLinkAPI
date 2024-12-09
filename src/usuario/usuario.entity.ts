import { Medico } from 'src/medico/medico.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('usuario')
export abstract class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  criadoAt: Date;

  @UpdateDateColumn()
  modificadoAt: Date;

  @Column({ default: false })
  deletado: boolean;

  @OneToMany(() => Medico, (medico) => medico.usuario)
  medicos: Medico[];
}
