import { BaseErrorResponse } from "../base/base-error.response";

/** 401 Unauthorized */
export class UnauthorizedError extends BaseErrorResponse {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
