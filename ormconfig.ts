import { DataSource } from "typeorm";
import { User } from "./src/modules/user/entities/user.entity";
import * as dotenv from "dotenv";
import * as path from "path";

// Load env từ thư mục api nếu có, fallback sang root
dotenv.config({ path: path.resolve(__dirname, ".env.development") });
dotenv.config({ path: path.resolve(__dirname, "../.env.development") });

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? "trading_user",
  password: process.env.DB_PASSWORD ?? "trading_password",
  database: process.env.DB_NAME ?? "trading_db",
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
