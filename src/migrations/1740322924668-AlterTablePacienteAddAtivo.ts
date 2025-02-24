import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePacienteAddAtivo1740322924668 implements MigrationInterface {
    name = 'AlterTablePacienteAddAtivo1740322924668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "paciente"
            ADD COLUMN "ativo" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "paciente"
            DROP COLUMN "ativo"
        `);
    }

}
