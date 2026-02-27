import { BaseErrorResponse } from "../base/base-error.response";

/** 408 Request Timeout */
export class TimeoutError extends BaseErrorResponse {
  constructor(message = "Request timeout") {
    super(message, 408);
  }
}
