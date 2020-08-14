import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendableClarification1593475993703 implements MigrationInterface {
    name = 'AttendableClarification1593475993703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendable" DROP CONSTRAINT "FK_9d77d271a35e00df8590ca58341"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP CONSTRAINT "FK_7c5cf2a32cf384a6c1742904169"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "hostId"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "managed"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "hostId"`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "hostVrcUserId" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "vrcWorldID" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "hostVrcUserId" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "vrcWorldID" character varying(40)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "vrcWorldID"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP COLUMN "hostVrcUserId"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "vrcWorldID"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP COLUMN "hostVrcUserId"`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "hostId" uuid`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD "managed" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD "hostId" uuid`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD CONSTRAINT "FK_7c5cf2a32cf384a6c1742904169" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD CONSTRAINT "FK_9d77d271a35e00df8590ca58341" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
