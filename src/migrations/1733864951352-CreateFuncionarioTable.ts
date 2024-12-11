import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuncionarioTable1733864951352 implements MigrationInterface {
    name = 'CreateFuncionarioTable1733600450823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "funcionario" 
            ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "nome" character varying(100) NOT NULL, 
            "email" character varying NOT NULL, 
            "senha" character varying NOT NULL, 
            "ativo" boolean DEFAULT true,
            "criadoAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            "modificadoAt" TIMESTAMP,
            "deletado" boolean DEFAULT false,
            "crm" varchar(50),
            CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), 
            CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "funcionario"`);
    }

}
