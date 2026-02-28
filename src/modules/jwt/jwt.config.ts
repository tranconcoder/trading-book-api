import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { registerAs } from "@nestjs/config";
import type { StringValue } from "ms";

/**
 * Namespace for JWT-related configuration.
 */
export const JWT_CONFIG_NAMESPACE = "jwt";

/**
 * Interface representing the JWT configuration settings.
 */
export interface JwtConfig {
  /**
   * Expiration time for access tokens (e.g., '15m').
   */
  accessExpires: StringValue;

  /**
   * Expiration time for refresh tokens (e.g., '7d').
   */
  refreshExpires: StringValue;

  /**
   * Algorithm used for signing access tokens (e.g., 'RS256').
   */
  accessAlgorithm: string;

  /**
   * Algorithm used for signing refresh tokens (e.g., 'RS256').
   */
  refreshAlgorithm: string;
}

/**
 * Configuration factory for JWT settings.
 * Loads expiration times and algorithms from environment variables.
 */
export default registerAs(
  JWT_CONFIG_NAMESPACE,
  (): JwtConfig => ({
    accessExpires: Env.get(EEnvKey.jwtAccessExpires, "15m") as StringValue,
    refreshExpires: Env.get(EEnvKey.jwtRefreshExpires, "7d") as StringValue,

    accessAlgorithm: Env.get(EEnvKey.jwtAccessAlgorithm, "RS256"),
    refreshAlgorithm: Env.get(EEnvKey.jwtRefreshAlgorithm, "RS256"),
  }),
);
