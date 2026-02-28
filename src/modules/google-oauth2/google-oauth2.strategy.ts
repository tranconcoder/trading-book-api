import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import appConfig, { type AppConfig } from "@config/app.config";
import vluteConfig, { type VluteConfig } from "@config/vlute.config";

import { ErrorCode, ErrorMessage, ForbiddenError } from "@/core/response";
import { UserService } from "../user/user.service";
import { createSyncUserSchema } from "./google-oauth2.validation";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(googleOauth2Config.KEY)
    private config: GoogleOAuth2Config,
    @Inject(appConfig.KEY)
    private app: AppConfig,
    @Inject(vluteConfig.KEY)
    private vlute: VluteConfig,
    private userService: UserService,
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

    // Validate using Zod
    const schema = createSyncUserSchema(this.vlute.studentEmailSuffix);
    const validationResult = schema.safeParse({
      email,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatar: photos?.[0]?.value,
    });

    if (!validationResult.success) {
      const issues = validationResult.error.issues;
      const isInvalidDomain = issues.some(
        (i) => i.message === "INVALID_DOMAIN",
      );

      if (isInvalidDomain) {
        throw new ForbiddenError(
          ErrorMessage.GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX,
          ErrorCode.GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX,
        );
      }

      throw new ForbiddenError(
        ErrorMessage.GOOGLE_OAUTH2_PROFILE_INFO_INCOMPLETE,
        ErrorCode.GOOGLE_OAUTH2_PROFILE_INFO_INCOMPLETE,
      );
    }

    const {
      firstName,
      lastName,
      avatar,
      email: validatedEmail,
    } = validationResult.data;

    const user = {
      email: validatedEmail,
      firstName,
      lastName,
      picture: avatar,
      accessToken,
      refreshToken,
    };

    // Sync user data
    this.userService.syncUser({
      email: validatedEmail,
      firstName,
      lastName,
      avatar,
    });

    done(null, user);
  }
}
