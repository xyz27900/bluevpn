import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1644882348395 implements MigrationInterface {
  name = 'User1644882348395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "expireDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
  }
}
