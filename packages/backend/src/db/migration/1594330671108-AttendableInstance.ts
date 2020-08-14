import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendableInstance1594330671108 implements MigrationInterface {
    name = 'AttendableInstance1594330671108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "vrcWorldInstance" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "vrcWorldInstance"`);
    }

}
