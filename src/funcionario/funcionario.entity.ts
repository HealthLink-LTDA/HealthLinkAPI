import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity('funcionario')
export class Funcionario extends Usuario{
    @PrimaryColumn('uuid') 
    @OneToOne(() => Usuario, { cascade: true, eager: true }) 
    @JoinColumn({ name: 'id' }) 
    id: string;

    @Column({ unique: true })
    cpf: string;
}
