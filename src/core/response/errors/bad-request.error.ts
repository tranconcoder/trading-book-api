import { BaseErrorResponse } from "../base/base-error.response";

/** 400 Bad Request */
export class BadRequestError extends BaseErrorResponse {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}
