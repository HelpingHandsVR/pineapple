import {MigrationInterface, QueryRunner} from "typeorm";

export class AttendableInitial1593475248965 implements MigrationInterface {
    name = 'AttendableInitial1593475248965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Attendable" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "createdBy" uuid NOT NULL, "updatedBy" uuid, "startsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "type" integer NOT NULL, "name" character varying NOT NULL, "definitionId" uuid, "hostId" uuid, CONSTRAINT "PK_61a5235871849ec1296d38a3ce6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AttendableDefinition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "createdBy" uuid NOT NULL, "updatedBy" uuid, "managed" boolean NOT NULL DEFAULT true, "type" integer NOT NULL, "name" character varying NOT NULL, "cronSchedule" character varying NOT NULL, "hostId" uuid, CONSTRAINT "PK_defc5641dfbf0a6cc94e7192a0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "createdBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permission" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "createdBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD CONSTRAINT "FK_31a526a5d8eec916704859ec4a0" FOREIGN KEY ("definitionId") REFERENCES "AttendableDefinition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Attendable" ADD CONSTRAINT "FK_9d77d271a35e00df8590ca58341" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" ADD CONSTRAINT "FK_7c5cf2a32cf384a6c1742904169" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AttendableDefinition" DROP CONSTRAINT "FK_7c5cf2a32cf384a6c1742904169"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP CONSTRAINT "FK_9d77d271a35e00df8590ca58341"`);
        await queryRunner.query(`ALTER TABLE "Attendable" DROP CONSTRAINT "FK_31a526a5d8eec916704859ec4a0"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Permission" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "createdBy"`);
        await queryRunner.query(`DROP TABLE "AttendableDefinition"`);
        await queryRunner.query(`DROP TABLE "Attendable"`);
    }

}
