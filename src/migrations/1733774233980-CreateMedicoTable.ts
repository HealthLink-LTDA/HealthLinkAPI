import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicoTable1733774233980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'medico',
                columns: [
                { name: 'id', type: 'uuid', isPrimary: true },
                { name: 'crm', type: 'varchar', isUnique: true },
                ],
                foreignKeys: [
                {
                    columnNames: ['id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'usuario',
                    onDelete: 'CASCADE',
                },
                ],
            })
        );
    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medico');
    
        await queryRunner.dropTable('usuario', true);
    }

}
