import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, TableInheritance } from 'typeorm';

@Entity('usuario')
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
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
}
