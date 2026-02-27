import { BaseErrorResponse } from "../base/base-error.response";

/** Network error — unable to reach the server */
export class NetworkError extends BaseErrorResponse {
  constructor(message = "Network error") {
    super(message);
  }
}
