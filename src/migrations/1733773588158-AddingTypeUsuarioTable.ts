import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingColumnsToFuncionarioTable1733773588158 implements MigrationInterface {
    name = "AddingColumnsToFuncionarioTable1733773588158";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "funcionario" 
                ADD "ativo" boolean DEFAULT true,
                ADD "criadoAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ADD "modificadoAt" TIMESTAMP,
                ADD "deletado" boolean DEFAULT false,
                ADD "crm" varchar(50)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "funcionario" 
                DROP COLUMN "ativo",
                DROP COLUMN "criadoAt",
                DROP COLUMN "modificadoAt",
                DROP COLUMN "deletado",
                DROP COLUMN "crm"`
        );
    }
}
