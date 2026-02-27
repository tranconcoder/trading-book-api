import { BaseErrorResponse } from "../base/base-error.response";

/** 409 Conflict */
export class ConflictError extends BaseErrorResponse {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}
