import { ConfigType, registerAs } from "@nestjs/config";
import ms from "ms";

/**
 * Namespace for user-related configuration.
 */
export const USER_CONFIG_NAMESPACE = "user";

/**
 * Configuration factory for user module settings.
 * Includes Redis prefix and Time-To-Live for cached user profiles.
 */
const userConfig = registerAs(USER_CONFIG_NAMESPACE, () => ({
  /**
   * Prefix used for Redis keys related to user data.
   */
  redisPrefix: "user",

  /**
   * Duration in milliseconds for which user profiles are cached in Redis.
   * Default is 5 minutes.
   */
  profileTtl: ms("5m"),
}));

export default userConfig;

/**
 * Type definition for user module configuration inferred from the config factory.
 */
export type UserConfig = ConfigType<typeof userConfig>;
