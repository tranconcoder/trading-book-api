import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import appConfig, { type AppConfig } from "@config/app.config";

import { ErrorCode, ForbiddenError } from "@/core/response";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(googleOauth2Config.KEY)
    private config: GoogleOAuth2Config,
    @Inject(appConfig.KEY)
    private app: AppConfig,
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
        "Không tìm thấy email từ tài khoản Google",
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
