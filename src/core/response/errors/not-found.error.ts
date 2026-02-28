import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 404 Not Found */
export class NotFoundError extends BaseErrorResponse {
  constructor(message = "Not found", code?: ErrorCode) {
    super(message, 404, code);
  }
}
