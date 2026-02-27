import { BaseErrorResponse } from "../base/base-error.response";

/** 404 Not Found */
export class NotFoundError extends BaseErrorResponse {
  constructor(message = "Not found") {
    super(message, 404);
  }
}
