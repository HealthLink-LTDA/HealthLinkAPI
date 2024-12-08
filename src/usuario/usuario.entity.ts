import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
