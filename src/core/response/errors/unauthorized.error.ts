import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 401 Unauthorized */
export class UnauthorizedError extends BaseErrorResponse {
  constructor(message = "Unauthorized", code?: ErrorCode) {
    super(message, 401, code);
  }
}
