import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTriagemTable1734373325472 implements MigrationInterface {
    name = "CreateTriagemTable1734373325472";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "triagem" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "neurologico" INTEGER NOT NULL,
                "cardioVascular" INTEGER NOT NULL,
                "respiratorio" INTEGER NOT NULL,
                "nebulizacaoResgate" BOOLEAN NOT NULL,
                "vomitoPersistente" BOOLEAN NOT NULL,
                "data" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "pacienteId" uuid,
                "enfermeiraId" uuid,
                "deletado" boolean DEFAULT false,
                CONSTRAINT "FK_pacienteId" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_enfermeiraId" FOREIGN KEY ("enfermeiraId") REFERENCES "funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "triagem"`);
    }
}
