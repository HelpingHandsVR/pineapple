import {MigrationInterface, QueryRunner} from "typeorm";

export class DateColumnsTimestampFix1592872803609 implements MigrationInterface {
    name = 'DateColumnsTimestampFix1592872803609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "expiresAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordOauthRequest" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "expiresAt" date`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DiscordAccount" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
