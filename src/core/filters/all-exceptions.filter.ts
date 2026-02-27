import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { UnknownError, InternalServerError } from "@/core/response";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody;

    if (exception instanceof HttpException) {
      // If it's a known NestJS HttpException, we wrap it
      const response = exception.getResponse();
      let message: string;

      if (typeof response === "string") {
        message = response;
      } else if (
        typeof response === "object" &&
        response !== null &&
        "message" in response
      ) {
        const resMessage = (response as Record<string, unknown>).message;
        message = Array.isArray(resMessage)
          ? resMessage.join(", ")
          : String(resMessage);
      } else {
        message = exception.message;
      }

      responseBody = new UnknownError(message, httpStatus);
    } else {
      // If it's an unhandled error, we use InternalServerError
      responseBody = new InternalServerError(
        exception instanceof Error
          ? exception.message
          : "Internal server error",
      );
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
