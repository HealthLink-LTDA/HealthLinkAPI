import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCargoTable1733788237755 implements MigrationInterface {
    name = 'CreateCargoTable1733788237755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cargo" (
                "id" SERIAL PRIMARY KEY,
                "nome" character varying(100) NOT NULL,
                CONSTRAINT "UQ_cargo_nome" UNIQUE ("nome")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "funcionario"
            ADD COLUMN "cargoId" integer,
            ADD CONSTRAINT "FK_funcionario_cargo" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "funcionario"
            DROP CONSTRAINT "FK_funcionario_cargo",
            DROP COLUMN "cargoId"
        `);

        await queryRunner.query(`DROP TABLE "cargo"`);
    }
}
