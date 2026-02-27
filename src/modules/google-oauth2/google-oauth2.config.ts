import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { registerAs } from "@nestjs/config";

export const GOOGLE_OAUTH2_NAMESPACE = "google-oauth2";

export default registerAs(GOOGLE_OAUTH2_NAMESPACE, () => ({
  clientId: Env.getOrThrow(EEnvKey.googleOauth2ClientId),
  clientSecret: Env.getOrThrow(EEnvKey.googleOauth2ClientSecret),
  callbackUrl: Env.getOrThrow(EEnvKey.googleOauth2CallbackUrl),
  scopes: Env.getArray(EEnvKey.googleOauth2Scopes, ["email", "profile"]),
}));
