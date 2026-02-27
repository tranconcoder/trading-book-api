import { EEnvKey } from "../common/enums/env.enum";
import { Env } from "../common/utils/env.util";
import { ConfigType, registerAs } from "@nestjs/config";

export const DATABASE_CONFIG_NAMESPACE = "database";

const databaseConfig = registerAs(DATABASE_CONFIG_NAMESPACE, () => ({
  host: Env.get(EEnvKey.dbHost, "localhost"),
  port: Env.getInt(EEnvKey.dbPort, 5432),
  username: Env.get(EEnvKey.dbUser, "trading_user"),
  password: Env.get(EEnvKey.dbPassword, "trading_password"),
  database: Env.get(EEnvKey.dbName, "trading_db"),
}));

export default databaseConfig;
export type DatabaseConfig = ConfigType<typeof databaseConfig>;
