import {MigrationInterface, QueryRunner} from "typeorm";

export class StricterUniqueFields1593201575495 implements MigrationInterface {
    name = 'StricterUniqueFields1593201575495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permission" ADD CONSTRAINT "UQ_a99587dcc7fa748b044eb5a90e1" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "UQ_b852abd9e268a63287bc815aab6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_d91818cad115a9c1d4c0b42e2dc" UNIQUE ("vrcUserID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_d91818cad115a9c1d4c0b42e2dc"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "UQ_b852abd9e268a63287bc815aab6"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP CONSTRAINT "UQ_a99587dcc7fa748b044eb5a90e1"`);
    }

}
