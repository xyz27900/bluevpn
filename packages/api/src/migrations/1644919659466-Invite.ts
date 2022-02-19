import { MigrationInterface, QueryRunner } from 'typeorm';

export class Invite1644919659466 implements MigrationInterface {
  name = 'Invite1644919659466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "invite" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "accessOptionId" integer, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "invite" ADD CONSTRAINT "FK_9001f7ad10ee5a5c9009df79d2d" FOREIGN KEY ("accessOptionId") REFERENCES "access_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "invite" DROP CONSTRAINT "FK_9001f7ad10ee5a5c9009df79d2d"');
    await queryRunner.query('DROP TABLE "invite"');
  }
}
