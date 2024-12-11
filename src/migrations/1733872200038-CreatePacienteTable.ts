import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePacienteTable1733872200038 implements MigrationInterface {
    name = 'CreatePacienteTable1733872200038';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "paciente" 
            ("id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY, 
            "nome" character varying(100) NOT NULL, 
            "cpf" character varying , 
            "nomeResponsavel" character varying(100) NOT NULL, 
            "dataNascimento" TIMESTAMP,
            "notas" varchar(255))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paciente"`);
    }

}
