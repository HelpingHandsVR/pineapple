import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendableWorldLengthFix1593989836187 implements MigrationInterface {
    name = 'AttendableWorldLengthFix1593989836187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendable" RENAME COLUMN "vrcWorldID" TO "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" RENAME COLUMN "vrcWorldID" TO "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "vrcWorldId" character varying(41)`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "vrcWorldId" character varying(41)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "vrcWorldId" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "vrcWorldId"`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "vrcWorldId" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" RENAME COLUMN "vrcWorldId" TO "vrcWorldID"`);
        await queryRunner.query(`ALTER TABLE "Attendable" RENAME COLUMN "vrcWorldId" TO "vrcWorldID"`);
    }

}
