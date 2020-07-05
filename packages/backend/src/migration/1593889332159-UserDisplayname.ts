import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDisplayname1593889332159 implements MigrationInterface {
    name = 'UserDisplayname1593889332159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "display" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_221dbe141d48a5864d5b4034fa9" UNIQUE ("display")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_221dbe141d48a5864d5b4034fa9"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "display"`);
    }

}
