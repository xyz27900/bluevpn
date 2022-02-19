import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResetToken1644882378203 implements MigrationInterface {
  name = 'ResetToken1644882378203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "reset_token" ("token" character varying NOT NULL, "expireDate" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" integer, CONSTRAINT "PK_4765b68e90a8b2cf4b05a6a1c0d" PRIMARY KEY ("token"))');
    await queryRunner.query('ALTER TABLE "reset_token" ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "reset_token" DROP CONSTRAINT "FK_1d61419c157e5325204cbee7a28"');
    await queryRunner.query('DROP TABLE "reset_token"');
  }
}
