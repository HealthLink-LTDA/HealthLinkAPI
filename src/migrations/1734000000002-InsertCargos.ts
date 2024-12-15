import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCargos1734000000002 implements MigrationInterface {
    name = 'InsertCargos1734000000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "cargo" ("nome")
            VALUES 
            ('admin'),
            ('medico'),
            ('enfermeira');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "cargo"
            WHERE "nome" IN ('admin', 'medico', 'enfermeira');
        `);
    }
}
