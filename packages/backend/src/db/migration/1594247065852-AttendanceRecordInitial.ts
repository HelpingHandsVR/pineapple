import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendanceRecordInitial1594247065852 implements MigrationInterface {
    name = 'AttendanceRecordInitial1594247065852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "AttendanceRecord" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "startsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endsAt" TIMESTAMP WITH TIME ZONE, "userId" uuid NOT NULL, "attendableId" uuid, CONSTRAINT "REL_63695f7e3a6fc139b4917ed08b" UNIQUE ("userId"), CONSTRAINT "PK_0a684e1d1816012e4a13fcf1495" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "User" ADD "provisioned" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "FK_8d442be22381197e6f798a504ac" FOREIGN KEY ("attendableId") REFERENCES "Attendable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "FK_8d442be22381197e6f798a504ac"`);
        await queryRunner.query(`ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "FK_63695f7e3a6fc139b4917ed08ba"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "provisioned"`);
        await queryRunner.query(`DROP TABLE "AttendanceRecord"`);
    }

}
