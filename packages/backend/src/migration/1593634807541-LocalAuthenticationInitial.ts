import {MigrationInterface, QueryRunner} from "typeorm";

export class LocalAuthenticationInitial1593634807541 implements MigrationInterface {
    name = 'LocalAuthenticationInitial1593634807541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "User" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_718cf4917802e280f041b43e05f" UNIQUE ("passwordHash")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_718cf4917802e280f041b43e05f"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
    }

}
