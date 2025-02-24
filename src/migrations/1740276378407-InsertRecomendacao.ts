import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRecomendacao1740276378407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          INSERT INTO recomendacao (id, pontuacao_min, pontuacao_max, tempo_reanalise) VALUES
          (uuid_generate_v4(), 0, 2, 360),  -- Reavaliar em 6 horas
          (uuid_generate_v4(), 3, 4, 180),  -- Reavaliar em 3 horas
          (uuid_generate_v4(), 5, 6, 60),   -- Reavaliar em 1 hora
          (uuid_generate_v4(), 7, 9, 30),   -- Reavaliar em 30 minutos
          (uuid_generate_v4(), 10, 15, 10)  -- Reavaliar em 10 minutos (Crítico)
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM recomendacao`);
      }

}
