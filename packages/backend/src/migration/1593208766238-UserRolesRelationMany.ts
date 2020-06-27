import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRolesRelationMany1593208766238 implements MigrationInterface {
    name = 'UserRolesRelationMany1593208766238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_permissions__permission" ("roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_245fb47ffdde80620c90ffdac67" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fadecaf3483f6b1af0b9780cfa" ON "role_permissions__permission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_66d2dc53c558fe02caf494c12e" ON "role_permissions__permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "role_permissions__permission" ADD CONSTRAINT "FK_fadecaf3483f6b1af0b9780cfa2" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions__permission" ADD CONSTRAINT "FK_66d2dc53c558fe02caf494c12ed" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions__permission" DROP CONSTRAINT "FK_66d2dc53c558fe02caf494c12ed"`);
        await queryRunner.query(`ALTER TABLE "role_permissions__permission" DROP CONSTRAINT "FK_fadecaf3483f6b1af0b9780cfa2"`);
        await queryRunner.query(`DROP INDEX "IDX_66d2dc53c558fe02caf494c12e"`);
        await queryRunner.query(`DROP INDEX "IDX_fadecaf3483f6b1af0b9780cfa"`);
        await queryRunner.query(`DROP TABLE "role_permissions__permission"`);
    }

}
