import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 500 Internal Server Error */
export class InternalServerError extends BaseErrorResponse {
  constructor(message = "Internal server error", code?: ErrorCode) {
    super(message, 500, code);
  }
}
