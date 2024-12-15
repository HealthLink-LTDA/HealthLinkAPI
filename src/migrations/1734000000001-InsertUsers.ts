import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class InsertUsuarios1734000000001 implements MigrationInterface {
    name = 'InsertUsuarios1734000000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const environment = process.env.NODE_ENV || 'development';

        if (environment !== 'development') {
            console.log('Skipping migration InsertUsuarios1734000000001: not in development environment');
            return;
        }

        const plainPassword = process.env.DEFAULT_PASSWORD;
        if (!plainPassword) {
            throw new Error('DEFAULT_PASSWORD environment variable not set');
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        await queryRunner.query(`
            INSERT INTO "funcionario" ("id", "nome", "email", "senha", "crm", "cargoId")
            VALUES
            (uuid_generate_v4(), 'Administrador', 'admin@example.com', '${hashedPassword}', null, 
                (SELECT id FROM "cargo" WHERE "nome" = 'admin')),
            (uuid_generate_v4(), 'Medico Teste', 'medico@example.com', '${hashedPassword}', '123456', 
                (SELECT id FROM "cargo" WHERE "nome" = 'medico')),
            (uuid_generate_v4(), 'Enfermeira Teste', 'enfermeira@example.com', '${hashedPassword}', null, 
                (SELECT id FROM "cargo" WHERE "nome" = 'enfermeira'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "funcionario"
            WHERE "email" IN ('admin@example.com', 'medico@example.com', 'enfermeira@example.com');
        `);
    }
}
