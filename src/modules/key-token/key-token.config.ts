import { ConfigType, registerAs } from "@nestjs/config";
import ms from "ms";

export const KEY_TOKEN_CONFIG_NAMESPACE = "keyToken";

const keyTokenConfig = registerAs(KEY_TOKEN_CONFIG_NAMESPACE, () => {
  return {
    redisPrefix: "auth:key_token",
    ttl: ms("7 days"),
  };
});

export default keyTokenConfig;
export type KeyTokenConfig = ConfigType<typeof keyTokenConfig>;
