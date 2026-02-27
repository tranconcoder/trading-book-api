import { BaseErrorResponse } from "../base/base-error.response";

/** 500 Internal Server Error */
export class InternalServerError extends BaseErrorResponse {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
