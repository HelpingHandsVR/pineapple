import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDisplayNameNonUnique1594328469618 implements MigrationInterface {
    name = 'UserDisplayNameNonUnique1594328469618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_221dbe141d48a5864d5b4034fa9"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_221dbe141d48a5864d5b4034fa9" UNIQUE ("display")`);
    }

}
