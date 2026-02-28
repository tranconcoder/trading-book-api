import appConfig, { type AppConfig } from "@/configs/app.config";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import { OkResponse } from "@/core/response";
import { Response } from "express";

/**
 * Interface representing user information returned from the Google OAuth2 flow.
 */
export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * Service for handling Google OAuth2 specific logic.
 */
@Injectable()
export class GoogleOauth2Service {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfig: AppConfig,

    @Inject(googleOauth2Config.KEY)
    private readonly googleOauth2Config: GoogleOAuth2Config,
  ) {}

  /**
   * Handles the redirection after a successful Google login.
   * @param res - The Express response object.
   * @param user - The authenticated Google user information.
   * @returns An OkResponse with user data and redirection URL.
   */
  handleCallback(res: Response, user: GoogleUser) {
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
    ).sendResponse(res);
  }
}
