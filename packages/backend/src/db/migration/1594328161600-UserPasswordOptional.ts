import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPasswordOptional1594328161600 implements MigrationInterface {
    name = 'UserPasswordOptional1594328161600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL`);
    }

}
