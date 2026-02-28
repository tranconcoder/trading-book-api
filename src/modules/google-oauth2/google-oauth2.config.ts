import { EEnvKey } from "@/common/enums/env.enum";
import { Env } from "@/common/utils/env.util";
import { ConfigType, registerAs } from "@nestjs/config";

/**
 * Namespace for Google OAuth2 configuration.
 */
export const GOOGLE_OAUTH2_NAMESPACE = "google-oauth2";

/**
 * Configuration factory for Google OAuth2 settings.
 * Loads client credentials, callback URLs, and scopes from environment variables.
 */
const googleOauth2Config = registerAs(GOOGLE_OAUTH2_NAMESPACE, () => ({
  clientId: Env.getOrThrow(EEnvKey.googleOauth2ClientId),
  clientSecret: Env.getOrThrow(EEnvKey.googleOauth2ClientSecret),
  callbackUrl: Env.getOrThrow(EEnvKey.googleOauth2CallbackUrl),
  redirectUiUrl: Env.getOrThrow(EEnvKey.googleOauth2RedirectUiUrl),
  scopes: Env.getArray(EEnvKey.googleOauth2Scopes, ["email", "profile"]),
}));

export default googleOauth2Config;

/**
 * Type definition for Google OAuth2 configuration.
 */
export type GoogleOAuth2Config = ConfigType<typeof googleOauth2Config>;
