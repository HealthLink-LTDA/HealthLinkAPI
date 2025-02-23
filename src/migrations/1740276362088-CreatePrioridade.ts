import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePrioridade1740276362088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "prioridade" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "triagem_id" uuid NOT NULL,
                "paciente_id" uuid NOT NULL,
                "pontuacao" INTEGER NOT NULL,
                "recomendacao_id" uuid,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "FK_triagem_id" FOREIGN KEY ("triagem_id") REFERENCES "triagem"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_paciente_id" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_recomendacao_id" FOREIGN KEY ("recomendacao_id") REFERENCES "recomendacao"("id") ON DELETE SET NULL ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prioridade"`);
    }

}
