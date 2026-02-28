import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityProfileFields1772185601230 implements MigrationInterface {
  name = "UpdateUserEntityProfileFields1772185601230";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "first_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "last_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" date`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'other'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "google_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "googleId" character varying`,
    );
  }
}
