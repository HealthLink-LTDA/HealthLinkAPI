import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecomendacao1740276345763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "recomendacao" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "pontuacao_min" INTEGER NOT NULL,
                "pontuacao_max" INTEGER NOT NULL,
                "tempo_reanalise" INTEGER NOT NULL, -- Minutos para próxima análise
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recomendacao"`);
    }

}
