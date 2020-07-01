import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEmailVerificationPending1593642230795 implements MigrationInterface {
    name = 'UserEmailVerificationPending1593642230795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "pendingEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "User" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "emailVerified"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "pendingEmail"`);
    }

}
