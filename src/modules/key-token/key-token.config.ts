import { ConfigType, registerAs } from "@nestjs/config";
import ms from "ms";

/**
 * Namespace for key-token-related configuration.
 */
export const KEY_TOKEN_CONFIG_NAMESPACE = "keyToken";

/**
 * Configuration factory for key-token module settings.
 * Includes Redis prefix and TTL for stored key pairs.
 */
const keyTokenConfig = registerAs(KEY_TOKEN_CONFIG_NAMESPACE, () => {
  return {
    /**
     * Prefix used for Redis keys related to authentication key tokens.
     */
    redisPrefix: "auth:key_token",

    /**
     * Duration in milliseconds for which key tokens are valid and cached.
     * Default is 7 days.
     */
    ttl: ms("7 days"),
  };
});

export default keyTokenConfig;

/**
 * Type definition for key-token module configuration.
 */
export type KeyTokenConfig = ConfigType<typeof keyTokenConfig>;
