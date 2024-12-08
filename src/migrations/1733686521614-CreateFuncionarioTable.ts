import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuncionarioTable1733686521614 implements MigrationInterface {
    name = 'CreateFuncionarioTable1733686521614'

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "funcionario" (
                "id" uuid NOT NULL, 
                "cpf" character varying NOT NULL UNIQUE, 
                "ativo" boolean NOT NULL DEFAULT true, 
                "criadoAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "modificadoAt" TIMESTAMP NOT NULL, 
                "deletado" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_funcionario_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_funcionario_usuario" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "funcionario"`);
    }
}
