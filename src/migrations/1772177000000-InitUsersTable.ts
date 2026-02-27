import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitUsersTable1772177000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp extension for uuid_generate_v4()
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "googleId",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamptz",
            default: "now()",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
