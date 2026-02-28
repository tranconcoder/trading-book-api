import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 400 Bad Request */
export class BadRequestError extends BaseErrorResponse {
  constructor(message = "Bad request", code?: ErrorCode) {
    super(message, 400, code);
  }
}
