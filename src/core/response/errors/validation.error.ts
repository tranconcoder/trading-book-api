import { ErrorCode } from "../response.enum";
import { BaseErrorResponse } from "../base/base-error.response";

/** 422 Validation Error */
export class ValidationError extends BaseErrorResponse {
  constructor(message = "Validation failed", code?: ErrorCode) {
    super(message, 422, code);
  }
}
