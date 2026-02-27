import { BaseErrorResponse } from "../base/base-error.response";

/** 422 Validation Error */
export class ValidationError extends BaseErrorResponse {
  constructor(message = "Validation failed") {
    super(message, 422);
  }
}
