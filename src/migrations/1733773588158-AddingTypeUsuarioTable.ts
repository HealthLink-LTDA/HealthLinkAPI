import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingColumnsToUsuarioTable1733773588158 implements MigrationInterface {
    name = "AddingColumnsToUsuarioTable1733773588158";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "tipo" character varying(100)`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "ativo" boolean DEFAULT true`
        );
        
        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "criadoAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "modificadoAt" TIMESTAMP`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "deletado" boolean DEFAULT false`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "tipo"`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "ativo"`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "criadoAt"`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "modificadoAt"`
        );

        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "deletado"`
        );
    }
}
