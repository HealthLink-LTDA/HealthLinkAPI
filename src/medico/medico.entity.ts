import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity('medico')
export class Medico {
  @PrimaryColumn('uuid')
  id: string;  

  @ManyToOne(() => Usuario, (usuario) => usuario.medicos)
  @JoinColumn({ name: 'id' })
  usuario: Usuario;

  @Column({ unique: true })
  crm: string;
}