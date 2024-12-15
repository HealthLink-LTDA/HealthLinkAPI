import { UUID } from "crypto";
import { IntegerType } from "typeorm";

export class CreateTriagemDto {
    neurologico: IntegerType;

    cardioVascular: IntegerType;

    respiratorio: IntegerType;

    nebulizacaoResgate: boolean;

    vomitoPersistente: boolean;
    
    paciente: UUID;

    enfermeira: UUID;
}
