import appConfig, { type AppConfig } from "@/configs/app.config";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";

@Injectable()
export class GoogleOauth2Service {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfig: AppConfig,

    @Inject(googleOauth2Config.KEY)
    private readonly googleOauth2Config: GoogleOAuth2Config,
  ) {}

  handleCallback(user: unknown) {
    const redirectUrl = `${this.appConfig.clientUrl}${this.googleOauth2Config.redirectUiUrl}`;

    return {
      message: "Đăng nhập Google thành công",
      user,
      redirectUrl,
    };
  }
}
