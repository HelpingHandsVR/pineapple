import {MigrationInterface, QueryRunner} from "typeorm";

export class UserVRCUserIDNullable1593634922895 implements MigrationInterface {
    name = 'UserVRCUserIDNullable1593634922895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "vrcUserID" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "vrcUserID" SET NOT NULL`);
    }

}
