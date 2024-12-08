import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('funcionario')
export class Funcionario extends Usuario {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ default: true })
    ativo: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    criadoAt: Date;

    @Column()
    modificadoAt: Date;

    @Column({ default: false })
    deletado: boolean;
}
