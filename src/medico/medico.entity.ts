import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column } from 'typeorm';


@Entity('medico')
export class Medico extends Usuario{
    @Column({ unique: true })
    crm: string;
}
