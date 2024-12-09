import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingTypeUsuarioTable1733773588158 implements MigrationInterface {
    name = "AddingTypeUsuarioTable1733773588158";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "usuario" ADD "tipo" character varying(100)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "usuario" DROP COLUMN "tipo"`
        );
    }

}
