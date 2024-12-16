import { UUID } from "crypto";

export class CreateTriagemDto {
    neurologico: number;

    cardioVascular: number;

    respiratorio: number;

    nebulizacaoResgate: boolean;

    vomitoPersistente: boolean;
    
    paciente: UUID;

    enfermeira: UUID;
}
