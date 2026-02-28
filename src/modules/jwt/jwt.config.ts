import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { registerAs } from "@nestjs/config";
import type { StringValue } from "ms";

export const JWT_CONFIG_NAMESPACE = "jwt";

export interface JwtConfig {
  accessExpires: StringValue;
  refreshExpires: StringValue;
  accessAlgorithm: string;
  refreshAlgorithm: string;
}

export default registerAs(
  JWT_CONFIG_NAMESPACE,
  (): JwtConfig => ({
    accessExpires: Env.get(EEnvKey.jwtAccessExpires, "15m") as StringValue,
    refreshExpires: Env.get(EEnvKey.jwtRefreshExpires, "7d") as StringValue,

    accessAlgorithm: Env.get(EEnvKey.jwtAccessAlgorithm, "RS256"),
    refreshAlgorithm: Env.get(EEnvKey.jwtRefreshAlgorithm, "RS256"),
  }),
);
