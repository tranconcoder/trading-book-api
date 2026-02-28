import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 409 Conflict */
export class ConflictError extends BaseErrorResponse {
  constructor(message = "Conflict", code?: ErrorCode) {
    super(message, 409, code);
  }
}
