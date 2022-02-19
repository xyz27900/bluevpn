import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1644882492723 implements MigrationInterface {
  name = 'Order1644882492723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."order_type_enum" AS ENUM(\'PAYMENT\', \'INVITE\')');
    await queryRunner.query('CREATE TABLE "order" ("id" SERIAL NOT NULL, "type" "public"."order_type_enum" NOT NULL, "datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "accessOptionId" integer, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "order" ADD CONSTRAINT "FK_88edadfd35ccfb60999860d9242" FOREIGN KEY ("accessOptionId") REFERENCES "access_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"');
    await queryRunner.query('ALTER TABLE "order" DROP CONSTRAINT "FK_88edadfd35ccfb60999860d9242"');
    await queryRunner.query('DROP TABLE "order"');
    await queryRunner.query('DROP TYPE "public"."order_type_enum"');
  }
}
