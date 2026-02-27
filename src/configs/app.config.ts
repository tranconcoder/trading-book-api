import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { ConfigType, registerAs } from "@nestjs/config";

export const APP_CONFIG_NAMESPACE = "app";

// Handle get node env before register config
export const DEFAULT_NODE_ENV = "development";
export const DEFAULT_HOST = "localhost";
export const SERVER_PORT = Env.getInt(EEnvKey.serverPort, 3000);

export const getEnvPath = (): string => {
  const nodeEnv = Env.get(EEnvKey.nodeEnv, DEFAULT_NODE_ENV);
  return `.env.${nodeEnv}`;
};

// Register configuration to IoC
const appConfig = registerAs(APP_CONFIG_NAMESPACE, () => ({
  // Node env
  nodeEnv: Env.get(EEnvKey.nodeEnv, DEFAULT_NODE_ENV),

  // Client path
  clientUrl: Env.get(EEnvKey.clientUrl, "http://localhost:3001"),

  // Server path
  serverHost: Env.get(EEnvKey.serverHost, DEFAULT_HOST),
  serverPort: SERVER_PORT,
}));

export default appConfig;
export type AppConfig = ConfigType<typeof appConfig>;
