import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from "@nestjs/common";
import { Response } from "express";
import { BaseErrorResponse } from "@/core/response";
import appConfig, { type AppConfig } from "@/configs/app.config";
import googleOauth2Config, {
  type GoogleOAuth2Config,
} from "./google-oauth2.config";

/**
 * Exception filter for handling errors during the Google OAuth2 flow.
 * Catches BaseErrorResponse and HttpException, then redirects to a failure page on the UI.
 */
@Catch(BaseErrorResponse, HttpException)
export class GoogleOauth2Filter implements ExceptionFilter {
  constructor(
    @Inject(appConfig.KEY)
    private readonly app: AppConfig,
    @Inject(googleOauth2Config.KEY)
    private readonly googleOauth2: GoogleOAuth2Config,
  ) {}

  /**
   * Handles the exception by extracting error details and redirecting to the UI login failure page.
   * @param exception - The caught exception.
   * @param host - The arguments host containing request and response objects.
   */
  catch(exception: BaseErrorResponse | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorCode = "INTERNAL_SERVER_ERROR";
    let errorMessage = "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

    if (exception instanceof BaseErrorResponse) {
      errorCode = exception.code || errorCode;
      errorMessage = exception.message;
    } else if (exception instanceof HttpException) {
      errorCode = exception.getStatus().toString();
      errorMessage = exception.message;
    }

    const encodedMessage = Buffer.from(errorMessage, "utf-8").toString(
      "base64",
    );
    const params = new URLSearchParams({
      error: errorCode,
      message: encodedMessage,
    });
    const redirectUrl = `${this.app.clientUrl}/login/fail?${params.toString()}`;

    response.redirect(redirectUrl);
  }
}
