import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 403 Forbidden */
export class ForbiddenError extends BaseErrorResponse {
  constructor(message = "Forbidden", code?: ErrorCode) {
    super(message, 403, code);
  }
}
