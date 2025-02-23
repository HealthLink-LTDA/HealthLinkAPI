import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  nomeResponsavel: string;

  @Column()
  dataNascimento: Date;

  @Column()
  notas: string;

  @Column({ default: true })
  ativo: boolean;
}
