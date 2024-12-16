import { Funcionario } from "src/funcionario/funcionario.entity";
import { Paciente } from "src/paciente/paciente.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('triagem')
export class Triagem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    neurologico: number;

    @Column({ nullable: false })
    cardioVascular: number;

    @Column({ nullable: false })
    respiratorio: number;

    @Column({ nullable: false })
    nebulizacaoResgate: boolean;

    @Column({ nullable: false })
    vomitoPersistente: boolean;
    
    @ManyToOne(() => Paciente)
    @JoinColumn({ name: 'pacienteId' })
    paciente: Paciente;

    @ManyToOne(() => Funcionario)
    @JoinColumn({ name: 'enfermeiraId' })
    enfermeira: Funcionario;
}
