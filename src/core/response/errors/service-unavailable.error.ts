import { BaseErrorResponse } from "../base/base-error.response";

/** 503 Service Unavailable */
export class ServiceUnavailableError extends BaseErrorResponse {
  constructor(message = "Service unavailable") {
    super(message, 503);
  }
}
