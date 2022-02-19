import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccessOption1644882438474 implements MigrationInterface {
  name = 'AccessOption1644882438474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "access_option" ("id" SERIAL NOT NULL, "price" character varying NOT NULL, "duration" integer NOT NULL, "description" character varying NOT NULL, "highlighted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_62486659881ce35a695bdfa987d" PRIMARY KEY ("id"))');
    await queryRunner.query('INSERT INTO "access_option" ("id", "price", "duration", "description", "highlighted") VALUES (DEFAULT, \'0.003\', 2592000, \'1 month\', false), (DEFAULT, \'0.03\', 31536000, \'1 year\', true)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "access_option"');
  }
}
