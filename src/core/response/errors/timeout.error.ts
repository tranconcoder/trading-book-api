import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 408 Request Timeout */
export class TimeoutError extends BaseErrorResponse {
  constructor(message = "Request timeout", code?: ErrorCode) {
    super(message, 408, code);
  }
}
