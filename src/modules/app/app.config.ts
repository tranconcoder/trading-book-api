import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { registerAs } from "@nestjs/config";

export const APP_CONFIG_NAMESPACE = "app";

// Handle get node env before register config
export const DEFAULT_NODE_ENV = "development";
export const getEnvPath = () => {
  const nodeEnv = Env.get(EEnvKey.nodeEnv, DEFAULT_NODE_ENV);
  return `.env.${nodeEnv}`;
};

// Register configuration to IoC
export default registerAs(APP_CONFIG_NAMESPACE, () => ({
  // Node env
  nodeEnv: Env.get(EEnvKey.nodeEnv, DEFAULT_NODE_ENV),

  // Server path
  serverHost: Env.get(EEnvKey.serverHost, "0.0.0.0"),
  serverPort: Env.getInt(EEnvKey.serverPort, 3000),
}));
