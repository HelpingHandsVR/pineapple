import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDisableable1593887209311 implements MigrationInterface {
    name = 'UserDisableable1593887209311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "disabled" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "disabled"`);
    }

}
