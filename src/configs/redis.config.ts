import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { ConfigType, registerAs } from "@nestjs/config";

export const REDIS_CONFIG_NAMESPACE = "redis";

const redisConfig = registerAs(REDIS_CONFIG_NAMESPACE, () => ({
  host: Env.get(EEnvKey.redisHost, "localhost"),
  port: Env.getInt(EEnvKey.redisPort, 6379),
  password: Env.get(EEnvKey.redisPassword, ""),
  ttl: Env.getInt(EEnvKey.redisTtl, 3600),
}));

export default redisConfig;
export type RedisConfig = ConfigType<typeof redisConfig>;
