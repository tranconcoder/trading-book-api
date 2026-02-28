import appConfig, { type AppConfig } from "@/configs/app.config";
import { Inject, Injectable } from "@nestjs/common";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";
import { Response } from "express";
import { KeyTokenService } from "../key-token/key-token.service";
import { AUTH_COOKIES, DEFAULT_COOKIE_OPTIONS } from "./google-oauth2.constant";

/**
 * Interface representing user information returned from the Google OAuth2 flow.
 */
export interface GoogleUser {
  id: string;
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

    private readonly keyTokenService: KeyTokenService,
  ) {}

  /**
   * Handles the redirection after a successful Google login.
   * Sets authentication tokens as HTTP-only cookies and redirects to the client.
   * @param res - The Express response object.
   * @param user - The authenticated Google user information.
   */
  async handleCallback(res: Response, user: GoogleUser) {
    const redirectUrl = `${this.appConfig.clientUrl}${this.googleOauth2Config.redirectUiUrl}`;

    // 1. Generate local JWT token pair
    const { accessToken, refreshToken } =
      await this.keyTokenService.createKeyToken({
        userId: user.id,
        email: user.email,
      });

    // 2. Set HTTP-only cookies
    res.cookie(AUTH_COOKIES.ACCESS_TOKEN, accessToken, DEFAULT_COOKIE_OPTIONS);
    res.cookie(
      AUTH_COOKIES.REFRESH_TOKEN,
      refreshToken,
      DEFAULT_COOKIE_OPTIONS,
    );

    // 3. Redirect to client
    return res.redirect(redirectUrl);
  }
}
