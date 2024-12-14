import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cargo')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;
}
