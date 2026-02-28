import appConfig, { type AppConfig } from "@/configs/app.config";
import { Inject, Injectable, Res } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import { OkResponse } from "@/core/response";

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleOauth2Service {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfig: AppConfig,

    @Inject(googleOauth2Config.KEY)
    private readonly googleOauth2Config: GoogleOAuth2Config,
  ) {}

  handleCallback(@Res() res, user: GoogleUser) {
    const redirectUrl = `${this.appConfig.clientUrl}${this.googleOauth2Config.redirectUiUrl}`;

    return new OkResponse(
      {
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
        },
        redirectUrl,
      },
      "Đăng nhập Google thành công",
    );
  }
}
