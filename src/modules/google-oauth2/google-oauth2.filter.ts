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

@Catch(BaseErrorResponse, HttpException)
export class GoogleOauth2Filter implements ExceptionFilter {
  constructor(
    @Inject(appConfig.KEY)
    private readonly app: AppConfig,
    @Inject(googleOauth2Config.KEY)
    private readonly googleOauth2: GoogleOAuth2Config,
  ) {}

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

    const params = new URLSearchParams({
      error: errorCode,
      message: errorMessage,
    });
    const redirectUrl = `${this.app.clientUrl}/login/fail?${params.toString()}`;

    response.redirect(redirectUrl);
  }
}
