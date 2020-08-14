import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendanceRecordUserRelationMany1595709010414 implements MigrationInterface {
    name = 'AttendanceRecordUserRelationMany1595709010414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba"`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "REL_63695f7e3a6fc139b4917ed08b"`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba"`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "REL_63695f7e3a6fc139b4917ed08b" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
