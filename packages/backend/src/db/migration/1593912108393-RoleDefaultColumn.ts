import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleDefaultColumn1593912108393 implements MigrationInterface {
    name = 'RoleDefaultColumn1593912108393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" ADD "default" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "default"`);
    }

}
