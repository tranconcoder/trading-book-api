import { BaseErrorResponse } from "../base/base-error.response";

/** Catch-all for unidentified errors */
export class UnknownError extends BaseErrorResponse {
  constructor(error?: unknown, statusCode?: number) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "An unknown error occurred";

    super(message, statusCode);
  }
}
