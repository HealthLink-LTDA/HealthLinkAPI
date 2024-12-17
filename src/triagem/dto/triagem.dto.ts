import { UUID } from "crypto";

export class TriagemDto {
    neurologico: number;

    cardioVascular: number;

    respiratorio: number;

    nebulizacaoResgate: boolean;

    vomitoPersistente: boolean;
    
    paciente: UUID;

    enfermeira: UUID;
}
