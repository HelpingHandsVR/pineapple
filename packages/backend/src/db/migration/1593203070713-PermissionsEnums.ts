import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionsEnums1593203070713 implements MigrationInterface {
    name = 'PermissionsEnums1593203070713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permission" DROP CONSTRAINT "UQ_a99587dcc7fa748b044eb5a90e1"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "action" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "subject" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD CONSTRAINT "UQ_a99587dcc7fa748b044eb5a90e1" UNIQUE ("name")`);
    }

}
