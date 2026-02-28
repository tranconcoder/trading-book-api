import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import appConfig, { type AppConfig } from "@config/app.config";
import vluteConfig, { type VluteConfig } from "@config/vlute.config";

import { ErrorCode, ErrorMessage, ForbiddenError } from "@/core/response";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(googleOauth2Config.KEY)
    private config: GoogleOAuth2Config,
    @Inject(appConfig.KEY)
    private app: AppConfig,
    @Inject(vluteConfig.KEY)
    private vlute: VluteConfig,
  ) {
    const callbackURL = `http://${app.serverHost}:${app.serverPort}${config.callbackUrl}`;

    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL,
      scope: config.scopes,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new ForbiddenError(
        ErrorMessage.GOOGLE_OAUTH2_EMAIL_NOT_FOUND,
        ErrorCode.GOOGLE_OAUTH2_EMAIL_NOT_FOUND,
      );
    }

    if (!email.endsWith("@" + this.vlute.studentEmailSuffix)) {
      throw new ForbiddenError(
        ErrorMessage.GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX,
        ErrorCode.GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX,
      );
    }

    const user = {
      email,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos?.[0]?.value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
