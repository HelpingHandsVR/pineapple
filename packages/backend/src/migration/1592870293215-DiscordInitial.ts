import {MigrationInterface, QueryRunner} from "typeorm";

export class DiscordInitial1592870293215 implements MigrationInterface {
    name = 'DiscordInitial1592870293215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DiscordAccount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "accessToken" character varying(30), "expiresAt" date, "userId" uuid, CONSTRAINT "REL_8499e8c9a47d50beba0051d3fc" UNIQUE ("userId"), CONSTRAINT "PK_aa175095b4bdbf022d8e854d09f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DiscordOauthRequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "state" character varying(64) NOT NULL, CONSTRAINT "PK_a00a7db380447de49a8fd930a7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD CONSTRAINT "FK_8499e8c9a47d50beba0051d3fce" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP CONSTRAINT "FK_8499e8c9a47d50beba0051d3fce"`);
        await queryRunner.query(`DROP TABLE "DiscordOauthRequest"`);
        await queryRunner.query(`DROP TABLE "DiscordAccount"`);
    }

}
